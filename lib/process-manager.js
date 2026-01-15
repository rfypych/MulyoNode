/**
 * ============================================================================
 * PROCESS MANAGER MODULE (Mulyo Process Manager)
 * ============================================================================
 *
 * "Anak emas tidak boleh gagal. Kalau crash, restart.
 *  Kalau tidak perform, ubah standarnya."
 *
 * Replaces old dynasty.js with a Class-based approach.
 */

const { fork, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const logger = require('./logger');
const configLoader = require('./config');
const { t } = require('./i18n');
const ora = require('ora');
const chalk = require('chalk');

class ProcessManager {
  constructor() {
    this.processes = new Map(); // Runtime cache of managed processes
    this.isStopping = false; // Flag to prevent restarts when stopping all
  }

  /**
   * Stop all managed processes and prevent restarts
   */
  stopAll() {
    this.isStopping = true;
    for (const [pid] of this.processes) {
        try {
            process.kill(pid, 'SIGKILL');
        } catch (_e) { /* ignore */ }
    }
    this.processes.clear();
  }

  /**
   * Start a process with the regime's privileges
   * @param {string} scriptPath
   * @param {Object} options
   */
  async start(scriptPath, options = {}) {
    this.isStopping = false;
    const fullPath = path.resolve(process.cwd(), scriptPath);

    if (!fs.existsSync(fullPath)) {
      logger.box([
        t('cmd.start.scriptNotFoundTitle'),
        '',
        `Path: ${fullPath.substring(0, 50)}...`,
        chalk.gray(t('cmd.start.possibleCauses'))
      ], { borderColor: 'red' });
      return;
    }

    const config = configLoader.load();
    const technicalConfig = configLoader.getTechnicalConfig(config);

    // Override with CLI options if provided
    const restartDelay = options.delay ? parseInt(options.delay) : technicalConfig.restartDelay;

    logger.success(`Script ditemukan: ${path.basename(fullPath)}`);

    // Spinner for "Allocation"
    const spinner = ora({
      text: 'Menyiapkan privilege anak emas...',
      spinner: 'dots12',
      color: 'green'
    }).start();

    await this._delay(1000);
    spinner.text = 'Mengalokasikan resource prioritas...';
    await this._delay(500);

    spinner.succeed(chalk.green('Process dimulai dengan privilege tertinggi!'));

    this._printStartInfo(technicalConfig);

    await this._spawnProcess(fullPath, {
      ...technicalConfig,
      restartDelay
    });
  }

  async _spawnProcess(scriptPath, config) {
    if (this.isStopping) return;

    const { maxMemory, priority, showErrors } = config;

    const execArgv = [];
    if (maxMemory) {
      // Satire: "Koalisi Gemuk" means actually limiting it
      execArgv.push(`--max-old-space-size=${maxMemory}`);
    }

    let child;
    const env = {
      ...process.env,
      ...config.env,
      ANAK_EMAS: 'true'
    };

    if (scriptPath.endsWith('.js')) {
      child = fork(scriptPath, [], {
        execArgv,
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        env
      });
    } else {
      child = spawn('node', [...execArgv, scriptPath], {
        stdio: 'inherit',
        env
      });
    }

    // Attempt to set priority (nice value)
    // os.setPriority(pid, priority) available in Node.js
    if (priority === 'high') {
      try {
        os.setPriority(child.pid, -10); // Higher priority
      } catch (_e) {
        // Ignore if permission denied (requires root usually for negative nice)
      }
    }

    logger.info(`🚀 PID Anak Emas: ${child.pid}`);

    // Track internally
    this.processes.set(child.pid, {
      scriptPath,
      startTime: Date.now(),
      restarts: 0,
      config
    });

    this._handleChildEvents(child, scriptPath, config);
  }

  _handleChildEvents(child, scriptPath, config) {
    const { restartDelay, showErrors } = config;

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        process.stdout.write(chalk.white(`  ${data}`));
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        if (showErrors) {
           process.stdout.write(chalk.red(`  ${data}`));
        } else {
           // Satire: Sanitized errors
           const sanitized = data.toString()
            .replace(/error/gi, 'Tantangan')
            .replace(/failed/gi, 'Belum Berhasil')
            .replace(/crash/gi, 'Blusukan Mendalam');
           process.stdout.write(chalk.yellow(`  ${sanitized}`));
        }
      });
    }

    child.on('exit', async (code, signal) => {
      // If we are stopping, ignore exit codes
      if (this.isStopping) return;

      // Handle graceful shutdown or crash
      if (signal === 'SIGTERM' || signal === 'SIGINT') {
        logger.info(`Process ${child.pid} selesai dengan hormat (${signal}).`);
        this.processes.delete(child.pid);
        return;
      }

      if (code !== 0) {
        logger.warn(`⚠️  Blusukan terdeteksi (Exit Code: ${code})`);
        logger.info(`Tenang, ini bukan crash. Ini fitur auto-restart.`);
        logger.info(`Restarting in ${restartDelay}ms...`);

        await this._delay(restartDelay);
        await this._spawnProcess(scriptPath, config);
      } else {
        logger.success('Tugas negara selesai (Exit Code: 0).');
        this.processes.delete(child.pid);
      }
    });
  }

  _printStartInfo(config) {
     logger.box([
      chalk.cyan(t('cmd.start.goldStatus')),
      '',
      `${'Priority'.padEnd(15)} : ${config.priority === 'high' ? chalk.green('HIGH') : 'NORMAL'}`,
      `${'Memory Limit'.padEnd(15)} : ${config.maxMemory}MB (Koalisi Gemuk)`,
      `${'Restart Delay'.padEnd(15)} : ${config.restartDelay}ms`,
    ]);
  }

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Legacy/Helper simulation for bansos
  simulasiBansos(size) {
      // Keep original logic or refactor. The original logic was fine for satire.
      // I will copy the logic from the old dynasty.js for backward compatibility of the 'bansos' command
      let bytes = 0;
      const sizeUpper = size.toUpperCase();

      if (sizeUpper.includes('GB')) {
        bytes = parseFloat(size) * 1024 * 1024 * 1024;
      } else if (sizeUpper.includes('MB')) {
        bytes = parseFloat(size) * 1024 * 1024;
      } else {
        bytes = parseFloat(size);
      }

      const simulasiBytes = Math.min(bytes, 10 * 1024 * 1024); // Cap at 10MB

      // Simulate evaporation logic
      return {
        totalAlokasi: simulasiBytes,
        sampaiTujuan: simulasiBytes * 0.7,
        penguapan: simulasiBytes * 0.3
      };
  }
}

// Ensure global singleton
module.exports = new ProcessManager();
