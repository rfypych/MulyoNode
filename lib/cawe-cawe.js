/**
 * ============================================================================
 * CAWE-CAWE MODULE - Modul Intervensi Global
 * ============================================================================
 * 
 * "Tidak ada masalah jika tidak ada yang melaporkan."
 * 
 * Filosofi: Error adalah "tantangan", bukan masalah.
 *           Semua masalah sudah "diambil alih pusat".
 *           Kritik adalah destabilisasi.
 * 
 * Modul ini menangani global error handling dengan cara yang...
 * tidak konvensional.
 * 
 * @module cawe-cawe
 * @author Koalisi Developer Indonesia
 */

const chalk = require('chalk');
const { createBox } = require('./ui');
const { t } = require('./i18n');

// ============================================================================
// VARIABEL PENGAWASAN
// ============================================================================

// Counter tantangan yang "ditangkis"
let totalTantanganDitangkis = 0;

// Counter janji yang tidak ditepati (unhandled rejections)
let janjiTakDitepati = 0;

// Log rahasia (tidak untuk publik)
const logRahasia = [];

// Flag apakah intervensi sudah aktif
let intervensiAktif = false;

// ============================================================================
// FUNGSI UTAMA: intervensiGlobal
// ============================================================================

/**
 * Mengaktifkan intervensi global untuk semua error
 * 
 * Filosofi: Jangan biarkan aplikasi berhenti hanya karena "error".
 *           Error adalah konstruksi sosial.
 *           Yang penting aplikasi tetap jalan, rakyat senang.
 */
function intervensiGlobal() {
    // Jangan double-register
    if (intervensiAktif) {
        console.log(chalk.gray('  ℹ️  Intervensi sudah aktif (tidak perlu double-check)\n'));
        return;
    }

    intervensiAktif = true;
    console.log(chalk.magenta('  🛡️  Protokol Cawe-Cawe diaktifkan'));
    console.log(chalk.gray('      Semua tantangan akan ditangkis secara otomatis.\n'));

    // ========================================
    // HANDLER: Uncaught Exceptions
    // ========================================
    process.on('uncaughtException', (tantangan, origin) => {
        totalTantanganDitangkis++;

        // Catat di log rahasia
        logRahasia.push({
            waktu: new Date().toISOString(),
            tipe: 'uncaughtException',
            pesan: tantangan.message,
            origin: origin
        });

        // Tampilkan pesan yang "menenangkan"
        console.log(createBox([
            chalk.yellow('🛡️  ' + t('cmd.cawe.intercepted')),
            '',
            t('cmd.cawe.takenOver'),
            t('cmd.cawe.continue'),
            '',
            `${chalk.gray(t('cmd.cawe.detail'))} ${tantangan.message.substring(0, 45)}...`,
            '',
            chalk.gray(`${t('cmd.cawe.count')} #${totalTantanganDitangkis} ${t('cmd.cawe.today')}`)
        ], { borderColor: 'yellow' }));

        // TIDAK EXIT! Tetap jalan seperti tidak terjadi apa-apa
        // Ini adalah fitur, bukan bug
    });

    // ========================================
    // HANDLER: Unhandled Rejections
    // ========================================
    process.on('unhandledRejection', (alasan, janji) => {
        janjiTakDitepati++;

        // Catat di log rahasia
        logRahasia.push({
            waktu: new Date().toISOString(),
            tipe: 'unhandledRejection',
            pesan: alasan?.message || String(alasan)
        });

        // Tampilkan pesan yang relatable
        console.log(createBox([
            chalk.cyan('📜 ' + t('cmd.cawe.promiseTitle')),
            '',
            t('cmd.cawe.wajar'),
            t('cmd.cawe.keepBelieving'),
            '',
            chalk.gray(`${t('cmd.cawe.promiseCount')}${janjiTakDitepati} ${t('cmd.cawe.notKept')}`)
        ], { borderColor: 'cyan' }));

        // Tetap tidak exit
    });

    // ========================================
    // HANDLER: Warnings
    // ========================================
    process.on('warning', (peringatan) => {
        // Warning = kritik terselubung, harus diredam

        logRahasia.push({
            waktu: new Date().toISOString(),
            tipe: 'warning',
            pesan: peringatan.message
        });

        // Ubah framing-nya
        console.log(createBox([
            `ℹ️  ${t('cmd.cawe.inputTitle')}`,
            '',
            `"${peringatan.message.substring(0, 60)}..."`,
            '',
            t('cmd.cawe.statusRecorded'),
            t('cmd.cawe.noTimeline')
        ], { borderColor: 'gray' }));
    });

    // ========================================
    // HANDLER: Exit
    // ========================================
    process.on('exit', (code) => {
        if (code !== 0) {
            console.log(createBox([
                `📊 ${t('cmd.cawe.sessionReportTitle')}:`,
                '',
                `${t('cmd.start.exitCode').padEnd(20)} : ${code} (${code === 0 ? t('success') : t('error')})`,
                `${t('cmd.cawe.challengesIntercepted').padEnd(20)} : ${totalTantanganDitangkis}`,
                `${t('cmd.cawe.unfulfilledPromises').padEnd(20)} : ${janjiTakDitepati}`,
                `${t('cmd.cawe.secretLog').padEnd(20)} : ${logRahasia.length}`,
                '',
                chalk.gray(t('cmd.cawe.reportNote'))
            ], { borderColor: 'yellow' }));
        }
    });
}

// ============================================================================
// FUNGSI: pasangPengawasan
// ============================================================================

/**
 * Memasang sistem pengawasan (surveillance) pada console
 * 
 * Filosofi: Semua output harus melewati "screening" pusat.
 *           Yang negatif diubah jadi positif.
 *           Yang kritis diubah jadi konstruktif.
 * 
 * @param {Object} options - Opsi pengawasan
 */
function pasangPengawasan(options = {}) {
    const {
        ubahNegatif = true,     // Ubah kata-kata negatif
        sensorKritik = true,    // Sensor kritik keras
        promosiPrestasi = true  // Tambahkan prestasi di output
    } = options;

    // Simpan console.log asli
    const logAsli = console.log.bind(console);
    const errorAsli = console.error.bind(console);
    const warnAsli = console.warn.bind(console);

    // Override console.log
    console.log = (...args) => {
        let output = args.map(arg => String(arg)).join(' ');

        if (ubahNegatif) {
            output = ubahFraming(output);
        }

        logAsli(output);
    };

    // Override console.error
    console.error = (...args) => {
        let output = args.map(arg => String(arg)).join(' ');

        if (sensorKritik) {
            // Ubah "error" jadi "tantangan"
            output = output.replace(/error/gi, 'Tantangan');
            output = output.replace(/failed/gi, 'Belum Tercapai');
            output = output.replace(/crash/gi, 'Blusukan Mendalam');
            output = output.replace(/bug/gi, 'Fitur Tersembunyi');
            output = output.replace(/fatal/gi, 'Signifikan');
        }

        // Pakai warn, bukan error (lebih lembut)
        warnAsli(chalk.yellow('[TANTANGAN]'), output);
    };

    // Override console.warn
    console.warn = (...args) => {
        let output = args.map(arg => String(arg)).join(' ');

        // Warning = masukan konstruktif
        logAsli(chalk.gray('[MASUKAN]'), output);
    };

    console.log(chalk.gray('  👁️  Sistem pengawasan aktif (mode: konstruktif)\n'));
}

/**
 * Mengubah framing kata-kata negatif menjadi positif
 * 
 * @param {string} text - Text yang akan diubah
 * @returns {string} Text dengan framing baru
 */
function ubahFraming(text) {
    const kamusFraming = {
        // Teknis
        'error': 'tantangan',
        'Error': 'Tantangan',
        'ERROR': 'TANTANGAN',
        'failed': 'belum berhasil',
        'Failed': 'Belum Berhasil',
        'FAILED': 'BELUM BERHASIL',
        'crash': 'blusukan',
        'Crash': 'Blusukan',
        'CRASH': 'BLUSUKAN',
        'bug': 'fitur tersembunyi',
        'Bug': 'Fitur Tersembunyi',
        'BUG': 'FITUR TERSEMBUNYI',
        'fatal': 'signifikan',
        'Fatal': 'Signifikan',
        'FATAL': 'SIGNIFIKAN',
        'warning': 'masukan',
        'Warning': 'Masukan',
        'WARNING': 'MASUKAN',
        'deprecated': 'klasik',
        'Deprecated': 'Klasik',
        'slow': 'deliberate',
        'timeout': 'proses birokrasi',
        'Timeout': 'Proses Birokrasi',

        // Umum
        'problem': 'tantangan',
        'Problem': 'Tantangan',
        'issue': 'masukan',
        'Issue': 'Masukan',
        'broken': 'dalam perbaikan',
        'Broken': 'Dalam Perbaikan',
        'failure': 'pengalaman belajar',
        'Failure': 'Pengalaman Belajar',
        'kritik': 'masukan konstruktif',
        'Kritik': 'Masukan Konstruktif',
        'korupsi': 'optimalisasi anggaran',
        'Korupsi': 'Optimalisasi Anggaran',
    };

    let hasil = text;
    for (const [asli, baru] of Object.entries(kamusFraming)) {
        hasil = hasil.split(asli).join(baru);
    }

    return hasil;
}

// ============================================================================
// FUNGSI: getLogRahasia
// ============================================================================

/**
 * Mendapatkan log rahasia (hanya untuk internal)
 * 
 * @param {string} kunciAkses - Kunci akses rahasia
 * @returns {Array|null} Log rahasia atau null jika tidak authorized
 */
function getLogRahasia(kunciAkses) {
    // Kunci akses yang valid (hardcoded untuk parodi)
    const KUNCI_VALID = 'inner-circle-2026';

    if (kunciAkses === KUNCI_VALID) {
        return logRahasia;
    }

    console.log(chalk.red('  ⛔ Akses ditolak. Log ini bersifat RAHASIA.'));
    console.log(chalk.gray('     Hubungi tim humas untuk informasi lebih lanjut.\n'));

    return null;
}

// ============================================================================
// FUNGSI: laporkanStatistik
// ============================================================================

/**
 * Melaporkan statistik tantangan (untuk publik)
 * 
 * @returns {Object} Statistik yang "sudah dikurasi"
 */
function laporkanStatistik() {
    return {
        // Statistik resmi (untuk publik)
        tantanganDitangani: totalTantanganDitangkis,
        janjiYangDiproses: janjiTakDitepati,
        statusSistem: 'STABIL',
        kepuasanRakyat: '99%',

        // Disclaimer
        catatan: 'Angka-angka di atas bersifat ilustratif dan tidak dapat dijadikan bukti hukum.'
    };
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    intervensiGlobal,
    pasangPengawasan,
    ubahFraming,
    getLogRahasia,
    laporkanStatistik,

    // Export getter untuk statistik
    getStatistik: () => ({
        totalTantanganDitangkis,
        janjiTakDitepati,
        intervensiAktif
    })
};
