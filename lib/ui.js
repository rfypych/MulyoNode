/**
 * ============================================================================
 * UI HELPER MODULE
 * ============================================================================
 * 
 * "Pencitraan itu penting"
 * 
 * Modul untuk mengatur tampilan output agar selalu rapi dan fotogenik
 * untuk kebutuhan dokumentasi dan publikasi media.
 * 
 * @module ui
 */

const chalk = require('chalk');

// Helper untuk menghapus ANSI codes (warna) agar perhitungan panjang string akurat
function stripAnsi(string) {
    if (typeof string !== 'string') return string;
    return string.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ''
    );
}

/**
 * Membuat kotak pesan yang rapi (Pencitraan Box)
 * @param {string|string[]} lines - Baris-baris text
 * @param {object} options - Konfigurasi kotak
 */
function createBox(lines, options = {}) {
    // Convert single string to array
    if (!Array.isArray(lines)) {
        lines = lines.split('\n');
    }

    // Config default
    const config = {
        padding: 1,
        borderColor: 'gray',
        borderStyle: 'double', // double or single
        minWidth: 50,
        title: null,
        footer: null,
        ...options
    };

    // Styles
    const styles = {
        double: {
            tl: '╔', tr: '╗', bl: '╚', br: '╝',
            h: '═', v: '║'
        },
        single: {
            tl: '┌', tr: '┐', bl: '└', br: '┘',
            h: '─', v: '│'
        }
    };

    const chars = styles[config.borderStyle] || styles.double;
    const borderColorFn = chalk[config.borderColor] || chalk.gray;

    // Hitung panjang konten terpanjang (visual width, tanpa ANSI codes)
    const maxContentWidth = lines.reduce((max, line) => {
        return Math.max(max, stripAnsi(line).length);
    }, 0);

    // Lebar total (content + padding * 2)
    // Pastikan minimal minWidth
    let innerWidth = Math.max(config.minWidth - (config.padding * 2), maxContentWidth);

    // Jika title lebih panjang
    if (config.title) {
        innerWidth = Math.max(innerWidth, stripAnsi(config.title).length + 4);
    }

    const result = [];

    // Top Border
    let topBorder = chars.tl + chars.h.repeat(innerWidth + (config.padding * 2)) + chars.tr;
    if (config.title) {
        // Insert title into border
        // Format: ╔══ TITLE ════════╗
        const plainTitle = stripAnsi(config.title);
        const titleStart = 2; // Start after corner + 1 char
        // Reconstruction is complex for direct insertion, simplified approach:
        // Just replace part of the top border string? No, easier to build it.
        const before = chars.h.repeat(2);
        const after = chars.h.repeat(innerWidth + (config.padding * 2) - 2 - plainTitle.length - 2);
        // Note: This logic assumes title fits, which we handled in width calc

        // We can't mix ANSI codes easily with repeat. 
        // Let's just print title inside the box usually, but user box had it "inside" 
        // Actually the user mockups show title inside or text. 
        // The previous implementation was:
        // ╔════...
        // ║ ...

        // Let's stick to standard top border
    }
    result.push(borderColorFn(topBorder));

    // Content Lines
    const padH = ' '.repeat(config.padding);

    lines.forEach(line => {
        const plainLine = stripAnsi(line);
        const paddingRight = ' '.repeat(innerWidth - plainLine.length);
        result.push(borderColorFn(chars.v) + padH + line + paddingRight + padH + borderColorFn(chars.v));
    });

    // Bottom Border
    result.push(borderColorFn(chars.bl + chars.h.repeat(innerWidth + (config.padding * 2)) + chars.br));

    return '\n' + result.map(l => '  ' + l).join('\n') + '\n';
}

module.exports = {
    createBox,
    stripAnsi
};
