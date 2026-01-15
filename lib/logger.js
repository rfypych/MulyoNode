const chalk = require('chalk');

class Logger {
  constructor() {
    this.levels = {
      INFO: 'info',
      WARN: 'warn',
      ERROR: 'error',
      DEBUG: 'debug'
    };
  }

  /**
   * Format message with satire
   */
  info(message, context = '') {
    console.log(chalk.cyan(message));
    if (context) console.log(chalk.gray(`  ${context}`));
  }

  warn(message, context = '') {
    console.log(chalk.yellow(`⚠️  ${message}`));
    if (context) console.log(chalk.gray(`  ${context}`));
  }

  error(message, error = null) {
    console.log(chalk.red(`❌ ${message}`));
    if (error) {
      // Technical details for developer, formatted satirically
      console.log(chalk.gray(`  Tantangan Teknis: ${error.message}`));
      if (error.stack) {
        console.log(chalk.gray(`  Jejak Digital:\n${error.stack.split('\n').slice(0, 3).join('\n')}`));
      }
    }
  }

  success(message) {
    console.log(chalk.green(`✅ ${message}`));
  }

  box(lines, options = {}) {
    const { borderColor = 'cyan', title } = options;
    const colorFn = chalk[borderColor] || chalk.cyan;

    const width = 60;
    const horizontal = '═'.repeat(width);

    console.log(colorFn(`\n╔${horizontal}╗`));
    if (title) {
      const padLen = Math.max(0, width - title.length - 2);
      const leftPad = Math.floor(padLen / 2);
      const rightPad = padLen - leftPad;
      console.log(colorFn(`║ ${' '.repeat(leftPad)}${chalk.bold(title)}${' '.repeat(rightPad)} ║`));
      console.log(colorFn(`╠${horizontal}╣`));
    }

    lines.forEach(line => {
      // Simple stripping of ANSI codes to calculate padding might be needed for perfect alignment,
      // but for now we trust the content isn't too long or accept loose alignment.
      // To strictly box it is hard with chalk, so we just print inside.
      console.log(colorFn(`║ `) + line);
    });
    console.log(colorFn(`╚${horizontal}╝\n`));
  }
}

module.exports = new Logger();
