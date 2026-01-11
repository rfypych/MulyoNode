/**
 * ============================================================================
 * DYNASTY MODULE - Modul Dinasti
 * ============================================================================
 * 
 * "Anak emas tidak boleh gagal. Kalau crash, restart.
 *  Kalau tidak perform, ubah standarnya."
 * 
 * Modul ini menangani spawning child process dengan privilege khusus,
 * karena beberapa process lebih "sama" dari yang lain.
 * 
 * @module dynasty
 * @author Koalisi Developer Indonesia
 */

const { fork, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const { createBox } = require('./ui');
const { t } = require('./i18n');

// ============================================================================
// VARIABEL NEGARA (State Variables)
// ============================================================================

// Counter blusukan - berapa kali sudah restart
let jumlahBlusukan = 0;

// Memory yang "bocor" tapi tidak dicatat
let anggaranBocor = 0;

// Array untuk menyimpan "bantuan" memory
const jatahPremanMemory = [];

// Referensi ke child process anak emas
let anakEmasProses = null;

// Flag untuk menandakan apakah sedang dalam mode "krisis"
let modeKrisis = false;

// Timestamp terakhir restart
let waktuBlusukanTerakhir = null;

// ============================================================================
// FUNGSI UTAMA: jalankanDinasti
// ============================================================================

/**
 * Menjalankan script dengan privilege "anak emas"
 * 
 * Filosofi: Anak emas mendapat akses tak terbatas.
 *           Crash? Bukan crash, itu "blusukan".
 *           Error? Bukan error, itu "tantangan".
 * 
 * @param {string} scriptPath - Path ke script yang akan dijalankan
 * @param {Object} config - Konfigurasi dari revolusi-mental.config.js
 */
async function jalankanDinasti(scriptPath, config = {}) {
  const {
    delayBlusukan = 1000,
    watchMode = false,
    isAnakEmas = true,
    toleransiKritik = false,
    koalisiGemuk = true
  } = config;

  // Validasi script exists
  const fullPath = path.resolve(process.cwd(), scriptPath);

  if (!fs.existsSync(fullPath)) {
    console.log(createBox([
      t('cmd.start.scriptNotFoundTitle'),
      '',
      `Path: ${fullPath.substring(0, 50)}...`,
      '',
      chalk.gray(t('cmd.start.possibleCauses')),
      `├─ ${t('cmd.start.cause1')}`,
      `├─ ${t('cmd.start.cause2')}`,
      `└─ ${t('cmd.start.cause3')}`
    ], { borderColor: 'red' }));
    return;
  }

  console.log(chalk.green(`  ✅ Script ditemukan: ${path.basename(fullPath)}`));
  console.log(chalk.gray(`  📍 Lokasi: ${fullPath}\n`));

  // Mulai proses anak emas
  await mulaiProses(fullPath, {
    delayBlusukan,
    isAnakEmas,
    toleransiKritik,
    koalisiGemuk
  });
}

/**
 * Memulai child process dengan privilege tinggi
 * 
 * @param {string} scriptPath - Full path ke script
 * @param {Object} options - Opsi jalankan
 */
async function mulaiProses(scriptPath, options) {
  const { delayBlusukan, isAnakEmas, toleransiKritik, koalisiGemuk } = options;

  const spinner = ora({
    text: 'Menyiapkan privilege anak emas...',
    spinner: 'dots12',
    color: 'green'
  }).start();

  await delay(1000);
  spinner.text = 'Mengalokasikan resource prioritas...';

  await delay(500);
  spinner.succeed(chalk.green('Process dimulai dengan privilege tertinggi!'));

  console.log(createBox([
    chalk.cyan(t('cmd.start.goldStatus')),
    '',
    `${'Priority'.padEnd(15)} : ${chalk.green(t('cmd.start.priority'))}`,
    `${'Memory Limit'.padEnd(15)} : ${koalisiGemuk ? chalk.green('UNLIMITED') : chalk.yellow('TERBATAS')} (koalisi gemuk: ${koalisiGemuk ? 'ON' : 'OFF'})`,
    `${'Crash Policy'.padEnd(15)} : ${chalk.green(t('cmd.start.crashPolicy'))}`,
    `${'Error Policy'.padEnd(15)} : ${toleransiKritik ? chalk.yellow('SHOW') : chalk.green('HIDE')} (toleransi kritik: ${toleransiKritik ? 'ON' : 'OFF'})`
  ]));

  // Fork the script
  try {
    // Gunakan fork untuk script JS
    if (scriptPath.endsWith('.js')) {
      anakEmasProses = fork(scriptPath, [], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        env: {
          ...process.env,
          ANAK_EMAS: 'true',
          KOALISI_GEMUK: koalisiGemuk ? 'true' : 'false',
          NODE_ENV: 'produksi_prioritas'
        }
      });
    } else {
      // Untuk file non-JS, gunakan node langsung
      anakEmasProses = spawn('node', [scriptPath], {
        stdio: 'inherit',
        env: {
          ...process.env,
          ANAK_EMAS: 'true'
        }
      });
    }

    console.log(chalk.cyan(`  🚀 PID Anak Emas: ${anakEmasProses.pid}\n`));
    console.log(chalk.gray('  ─'.repeat(30)));
    console.log(chalk.gray('  OUTPUT PROGRAM:'));
    console.log(chalk.gray('  ─'.repeat(30) + '\n'));

    // Handle stdout
    if (anakEmasProses.stdout) {
      anakEmasProses.stdout.on('data', (data) => {
        process.stdout.write(chalk.white(`  ${data}`));
      });
    }

    // Handle stderr - tapi jangan terlalu dramatis
    if (anakEmasProses.stderr) {
      anakEmasProses.stderr.on('data', (data) => {
        if (!toleransiKritik) {
          // Ubah "Error" jadi "Tantangan"
          const sanitized = data.toString()
            .replace(/error/gi, 'Tantangan')
            .replace(/failed/gi, 'Belum Berhasil')
            .replace(/crash/gi, 'Blusukan Mendalam');
          process.stdout.write(chalk.yellow(`  ${sanitized}`));
        }
      });
    }

    // Handle exit - ini yang penting
    anakEmasProses.on('exit', async (code, signal) => {
      if (code !== 0) {
        jumlahBlusukan++;
        waktuBlusukanTerakhir = new Date();

        console.log(createBox([
          chalk.yellow('⚠️  ' + t('cmd.start.blusukan.detected')),
          '',
          chalk.gray(t('cmd.start.blusukan.calm')),
          chalk.gray(t('cmd.start.blusukan.explanation')),
          '',
          `${t('cmd.start.exitCode').padEnd(15)} : ${code}`,
          `${t('cmd.start.blusukan.count')} #${jumlahBlusukan} ${t('cmd.cawe.today')}`,
          '',
          chalk.cyan(`${t('cmd.start.blusukan.restarting')} ${delayBlusukan}ms...`)
        ], { borderColor: 'yellow' }));

        // Delay sebelum restart (simulasi birokrasi)
        await delay(delayBlusukan);

        // Restart dengan spinner
        const restartSpinner = ora({
          text: 'Menyiapkan restart (prosedur standar)...',
          spinner: 'dots',
          color: 'cyan'
        }).start();

        await delay(500);
        restartSpinner.text = 'Membersihkan memori (tidak semua, sisakan yang penting)...';

        await delay(500);
        restartSpinner.succeed(chalk.green('Restart berhasil!'));

        console.log(chalk.gray(`  📈 Statistik: ${jumlahBlusukan} blusukan, ${anggaranBocor}MB "penguapan"\n`));

        // Restart the process
        await mulaiProses(scriptPath, options);

      } else {
        console.log(createBox([
          chalk.green('✅ ' + t('cmd.start.completed')),
          '',
          `${t('cmd.start.exitCode').padEnd(15)} : ${code}`,
          `${t('cmd.start.totalBlusukan').padEnd(15)} : ${jumlahBlusukan}`,
          `${t('cmd.start.evaporation').padEnd(15)} : ${anggaranBocor}MB ${t('cmd.start.wajar')}`,
          '',
          chalk.gray(t('cmd.start.reported'))
        ], { borderColor: 'green' }));
      }
    });

    // Handle error
    anakEmasProses.on('error', (err) => {
      console.log(createBox([
        t('cmd.start.technicalChallenge'),
        '',
        `${err.message.substring(0, 50)}...`,
        '',
        chalk.gray(t('cmd.start.clarificationTeam'))
      ], { borderColor: 'yellow' }));
    });

  } catch (err) {
    console.log(chalk.red(`  Tantangan: ${err.message}`));
  }
}

// ============================================================================
// FUNGSI: simulasiBansos
// ============================================================================

/**
 * Simulasi pembagian "bantuan" memory
 * 
 * Filosofi: Menjelang Pilkada, rakyat harus merasakan bantuan.
 *           Meskipun 30% "menguap" di jalan.
 * 
 * @param {string} size - Ukuran bantuan (contoh: '512MB', '1GB')
 * @param {string} target - Target: 'heap', 'stack', atau 'all'
 */
function simulasiBansos(size, target) {
  // Parse size
  let bytes = 0;
  const sizeUpper = size.toUpperCase();

  if (sizeUpper.includes('GB')) {
    bytes = parseFloat(size) * 1024 * 1024 * 1024;
  } else if (sizeUpper.includes('MB')) {
    bytes = parseFloat(size) * 1024 * 1024;
  } else if (sizeUpper.includes('KB')) {
    bytes = parseFloat(size) * 1024;
  } else {
    bytes = parseFloat(size);
  }

  // Jangan benar-benar alokasi memory sebesar itu (bahaya!)
  // Ini hanya simulasi, alokasi kecil saja
  const simulasiBytes = Math.min(bytes, 10 * 1024 * 1024); // Max 10MB untuk simulasi

  console.log(chalk.gray(`\n  📦 Mengalokasikan bantuan simulasi: ${formatBytes(simulasiBytes)}`));

  // Alokasi dummy objects ke memory
  const jumlahPaket = 100;
  const ukuranPerPaket = Math.floor(simulasiBytes / jumlahPaket);

  for (let i = 0; i < jumlahPaket; i++) {
    // Buat dummy buffer
    const paketBantuan = Buffer.alloc(ukuranPerPaket);
    jatahPremanMemory.push(paketBantuan);

    // 30% "menguap"
    if (i % 3 === 0) {
      anggaranBocor += ukuranPerPaket / (1024 * 1024);
    }
  }

  console.log(chalk.green(`  ✅ ${jumlahPaket} paket bantuan berhasil dialokasikan`));
  console.log(chalk.yellow(`  ⚠️  ${Math.floor(jumlahPaket * 0.3)} paket mengalami "penguapan" di jalan`));

  return {
    totalAlokasi: simulasiBytes,
    sampaiTujuan: simulasiBytes * 0.7,
    penguapan: simulasiBytes * 0.3
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  } else if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  }
  return bytes + ' bytes';
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  jalankanDinasti,
  simulasiBansos,

  // Export state untuk debugging/testing
  getStatistik: () => ({
    jumlahBlusukan,
    anggaranBocor,
    jatahPremanMemory: jatahPremanMemory.length,
    waktuBlusukanTerakhir
  })
};
