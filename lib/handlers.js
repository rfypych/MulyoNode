const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Import modul-modul "strategis nasional"
const { jalankanDinasti, simulasiBansos } = require('./dynasty');
const { intervensiGlobal } = require('./cawe-cawe');
const { loloskanValidasi } = require('./mk');
const { t, setLanguage, getLanguage, getAvailableLanguages } = require('./i18n');
const { createBox } = require('./ui');
const state = require('./state');

// ============================================================================
// KONFIGURASI REZIM
// ============================================================================

const CONFIG_NAME = 'revolusi-mental.config.js';
const VERSION_REZIM = '1.0.0-periode-3';

// Template konfigurasi default
const DEFAULT_CONFIG = `/**
 * Konfigurasi Revolusi Mental
 *
 * File ini dibuat otomatis oleh MulyoNode.
 * Jangan diubah kecuali Anda bagian dari "inner circle".
 *
 * @generated ${new Date().toISOString()}
 */

module.exports = {
  // ========================
  // MODE OPERASI
  // ========================

  // Rezim menentukan gaya kepemimpinan runtime
  // 'otoriter' = Semua keputusan di tangan pusat
  // 'demokratis' = Opsi ini ada tapi tidak berfungsi
  rezim: 'otoriter',

  // ========================
  // PRIVILEGE SETTINGS
  // ========================

  // Anak emas mendapat prioritas CPU tertinggi
  // Ini bukan nepotisme, ini "meritokrasi terpimpin"
  anakEmas: true,

  // Koalisi gemuk = allow unlimited memory
  // Karena semua harus dapat jatah
  koalisiGemuk: true,

  // ========================
  // ERROR HANDLING
  // ========================

  // Kritik = destabilisasi. Jangan izinkan exit.
  toleransiKritik: false,

  // Mode blusukan menentukan delay sebelum restart
  // 'superfisial' = 1 detik (foto-foto dulu)
  // 'mendalam' = 5 detik (serius dikit)
  modeBlusukan: 'superfisial',

  // ========================
  // AUDIT SETTINGS
  // ========================

  // Status audit selalu WTP (Wajar Tanpa Pengecualian)
  // Karena yang mengaudit juga bagian dari koalisi
  statusAudit: 'WTP',

  // ========================
  // BANSOS SETTINGS
  // ========================

  // Ukuran "bantuan" memory yang akan diinjeksi
  anggaranBansos: '1GB',

  // Aktifkan menjelang event penting (deployment/pilkada)
  menjelangPilkada: true,

  // ========================
  // ADVANCED SETTINGS
  // ========================

  // Markup anggaran dalam persen (untuk overhead)
  markupAnggaran: 30,

  // Vendor pengadaan terpilih
  vendorPengadaan: 'PT. Koalisi Sejahtera',

  // Log level: 'rahasia' | 'terbatas' | 'publik'
  // 'rahasia' = hanya inner circle yang bisa lihat
  logLevel: 'terbatas',
};
`;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Handler functions extracted from bin/mulyo

async function handleLang(code) {
    if (code) {
        if (setLanguage(code)) {
            console.log(chalk.green(`\n  ✅ Language set to: ${code}\n`));
        } else {
            console.log(chalk.red(`\n  ❌ Unknown language: ${code}`));
            console.log(chalk.gray(`     Available: ${getAvailableLanguages().join(', ')}\n`));
        }
    } else {
        console.log(chalk.cyan(`\n  🌐 Current language: ${getLanguage()}`));
        console.log(chalk.gray(`     Available: ${getAvailableLanguages().join(', ')}`));
        console.log(chalk.gray(`\n  Usage: mulyo lang <code>`));
        console.log(chalk.gray(`  Or:    mulyo --lang <code> <command>\n`));
    }
}

async function handleInit(options) {
    console.log(chalk.cyan('\n🏗️  PEMBANGUNAN INFRASTRUKTUR DIMULAI\n'));

    const spinner = ora({
        text: 'Menyiapkan lahan proyek...',
        spinner: 'dots12',
        color: 'yellow'
    }).start();

    await delay(1500);
    spinner.text = 'Mengurus perizinan (ini yang lama)...';

    await delay(2000);
    spinner.text = 'Tender vendor pengadaan...';

    await delay(1000);
    spinner.text = 'Markup anggaran 30%...';

    await delay(1500);
    spinner.text = 'Finalisasi dokumen...';

    const configPath = path.join(process.cwd(), CONFIG_NAME);

    if (fs.existsSync(configPath) && !options.force) {
        spinner.fail(chalk.red('Infrastruktur sudah ada!'));
        console.log(chalk.gray('  Gunakan --force untuk revisi (seperti revisi UU tengah malam)\n'));
        return;
    }

    try {
        fs.writeFileSync(configPath, DEFAULT_CONFIG);
        await delay(500);
        spinner.succeed(chalk.green('Infrastruktur berhasil dibangun!'));

        console.log(createBox([
            `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.init.configCreated')}`,
            '',
            `📁 ${chalk.cyan(CONFIG_NAME)}`,
            '',
            `${chalk.yellow(t('warning').toUpperCase() + ':')} ${t('cmd.init.warning')}`,
            t('cmd.init.warningNote')
        ]));

    } catch (err) {
        spinner.fail(chalk.red('Pembangunan gagal!'));
        console.log(chalk.gray(`  Tantangan: ${err.message}`));
        console.log(chalk.gray('  (Tapi jangan khawatir, ini akan di-cover media)\n'));
    }
}

async function handleStart(script, options) {
    // Check if script is missing
    if (!script) {
        console.log(createBox([
            `${chalk.red(t('cmd.start.missingScript'))}`,
            '',
            ...t('cmd.start.missingScriptDesc').split('\n'),
            '',
            chalk.yellow(t('cmd.start.missingScriptSuggestion'))
        ]));
        process.exit(1);
    }

    // --- LOGIC BACKGROUND MODE (GERILYA) ---
    if (options.gerilya) {
        console.log(chalk.cyan('\n🥷  MEMBUKA JALUR ORDAL (BACKGROUND MODE)...\n'));

        const logPaths = state.getLogPaths(script);
        const out = fs.openSync(logPaths.out, 'a');
        const err = fs.openSync(logPaths.err, 'a');

        // Spawn process independent
        // Using process.argv[1] which is the executable path
        const child = spawn(process.execPath, [process.argv[1], 'start', script, '--internal-worker', '--delay', options.delay], {
            detached: true,
            stdio: ['ignore', out, err]
        });

        // Catat di buku hitam (Ordal DB)
        state.recruitMember({
            pid: child.pid,
            name: script,
            args: [script],
            mode: 'gerilya',
            startTime: Date.now()
        });

        // Lepas referensi supaya parent bisa exit
        child.unref();

        console.log(createBox([
            chalk.green('✅ OPERASI SENYAP BERHASIL DIMULAI'),
            '',
            `PID      : ${chalk.yellow(child.pid)}`,
            `Script   : ${chalk.white(script)}`,
            `Status   : ${chalk.cyan('Bergerak di bawah tanah')}`,
            '',
            `Log Out  : ${chalk.gray(logPaths.out)}`,
            `Log Err  : ${chalk.gray(logPaths.err)}`,
            '',
            chalk.yellow('Gunakan "mulyo sensus" untuk mengecek koalisi.')
        ]));

        process.exit(0);
        return;
    }

    // --- LOGIC FOREGROUND (KENEGARAAN) ---

    // Jika ini internal worker, jangan tampilkan banner heboh di stdout (karena masuk log)
    if (!options.internalWorker) {
        console.log(chalk.cyan('\n🚀 PELUNCURAN PROGRAM PRIORITAS NASIONAL\n'));
    } else {
        console.log(`[${new Date().toISOString()}] MULYONO WORKER STARTED (PID: ${process.pid})`);
    }

    // Pasang intervensi global - tidak boleh ada yang crash
    intervensiGlobal();

    // Load config jika ada
    let config = {};
    const configPath = path.join(process.cwd(), CONFIG_NAME);

    if (fs.existsSync(configPath)) {
        try {
            config = require(configPath);
            if (!options.internalWorker) console.log(chalk.gray('  📋 Konfigurasi rezim dimuat\n'));
        } catch (_e) {
            if (!options.internalWorker) console.log(chalk.yellow('  ⚠️  Konfigurasi tidak valid, menggunakan default\n'));
        }
    }

    // Validasi script dengan MK (hanya jika foreground biar log bersih)
    if (!options.internalWorker) {
        const hasilValidasi = loloskanValidasi(0);
        console.log(chalk.magenta(`  🏛️  [MK] Status: ${hasilValidasi.status}`));
        console.log(chalk.gray(`      "${hasilValidasi.keterangan}"\n`));
    }

    // Jalankan dengan dinasti mode
    await jalankanDinasti(script, {
        ...config,
        delayBlusukan: parseInt(options.delay),
        watchMode: options.watch,
        isAnakEmas: true
    });
}

async function handleAudit(options) {
    console.log(chalk.cyan('\n📊 AUDIT KEUANGAN DAN KINERJA\n'));

    const spinner = ora({
        text: 'Memeriksa laporan keuangan...',
        spinner: 'dots',
        color: 'blue'
    }).start();

    // Simulasi proses audit yang "serius"
    await delay(2000);
    spinner.text = 'Menghitung alokasi memori...';

    await delay(1500);
    spinner.text = 'Menelusuri kebocoran...';

    await delay(1000);
    spinner.text = 'Konsultasi dengan tim hukum...';

    await delay(2000);
    spinner.text = 'Menyusun narasi...';

    await delay(1000);
    spinner.succeed(chalk.green('Audit selesai!'));

    // Hasil audit (spoiler: selalu WTP)
    console.log(createBox([
        chalk.bgGreen.black(` ${t('cmd.audit.result')} `),
        '',
        `${t('cmd.audit.status').padEnd(12)} : ${chalk.green(t('cmd.audit.wtp'))}`,
        `${t('cmd.audit.leak').padEnd(12)} : ${chalk.green('0%')} (${t('cmd.audit.leakNote')})`,
        `${t('cmd.audit.corruption').padEnd(12)} : ${chalk.green(t('cmd.audit.corruptionNote'))}`,
        `${t('cmd.audit.compliance').padEnd(12)} : ${chalk.green('100%')} (${t('cmd.audit.complianceNote')})`,
        '',
        chalk.gray(t('cmd.audit.note'))
    ], { title: t('cmd.audit.title') }));

    if (options.detail) {
        console.log(chalk.gray(`
  📋 DETAIL AUDIT:

  Memory Usage:
  ├─ Heap Used     : 45 MB  ${chalk.green('✓ Wajar')}
  ├─ Heap Total    : 89 MB  ${chalk.green('✓ Wajar')}
  ├─ External      : 12 MB  ${chalk.green('✓ Wajar')}
  └─ Yang Hilang   : ??? MB ${chalk.yellow('○ Sedang ditelusuri')}

  CPU Usage:
  ├─ User          : 23%    ${chalk.green('✓ Wajar')}
  ├─ System        : 12%    ${chalk.green('✓ Wajar')}
  └─ Untuk Rakyat  : 65%    ${chalk.green('✓ Klaim')}

  ${chalk.gray('Disclaimer: Angka-angka di atas bersifat ilustratif')}
  ${chalk.gray('           dan tidak dapat dijadikan bukti hukum.')}
      `));
    }
}

async function handleBansos(options) {
    console.log(chalk.cyan('\n🎁 PROGRAM BANTUAN SOSIAL MEMORI\n'));

    console.log(chalk.yellow(`  📦 Paket    : Bantuan Buffer Langsung (BBL)`));
    console.log(chalk.yellow(`  💾 Ukuran   : ${options.size}`));
    console.log(chalk.yellow(`  🎯 Target   : ${options.target}\n`));

    const spinner = ora({
        text: 'Memverifikasi penerima bantuan...',
        spinner: 'dots',
        color: 'green'
    }).start();

    await delay(1500);
    spinner.text = 'Menyalurkan bantuan ke daerah...';

    await delay(2000);
    spinner.text = 'Dokumentasi untuk media...';

    await delay(1000);

    // Simulasi bansos
    try {
        simulasiBansos(options.size, options.target);
        spinner.succeed(chalk.green('Bantuan berhasil disalurkan!'));

        console.log(createBox([
            `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.bansos.successTitle')}`,
            '',
            `📊 ${t('cmd.bansos.stats')}:`,
            `├─ ${t('cmd.bansos.totalBudget').padEnd(15)} : ${options.size.padEnd(8)} ${chalk.green('✓ Cair')}`,
            `├─ ${t('cmd.bansos.delivered').padEnd(15)} : 70%      ${chalk.yellow('○ Wajar')}`,
            `├─ ${(t('cmd.bansos.evaporation')).padEnd(15)} : 30%      ${chalk.gray('○ ' + t('cmd.bansos.evaporationNote'))}`,
            `└─ ${t('cmd.bansos.documentation').padEnd(15)} : 100%     ${chalk.green('✓ Viral')}`,
            '',
            chalk.gray(t('cmd.bansos.timing'))
        ]));

    } catch (err) {
        spinner.fail(chalk.red('Penyaluran terhambat!'));
        console.log(chalk.gray(`  Tantangan: ${err.message}`));
        console.log(chalk.gray('  (Tim sedang melakukan klarifikasi)\n'));
    }
}

async function handleRapat(options) {
    console.log(chalk.cyan('\n🤝 RAPAT KOORDINASI LINTAS SEKTOR\n'));

    console.log(chalk.yellow(`  📍 Lokasi   : ${options.lokasi}`));
    console.log(chalk.yellow(`  ⏱️  Durasi   : ${options.durasi} menit`));
    console.log(chalk.yellow(`  🍽️  Katering : Premium (anggaran terpisah)\n`));

    const spinner = ora({
        text: 'Menunggu peserta hadir...',
        spinner: 'dots',
        color: 'cyan'
    }).start();

    await delay(3000);
    spinner.text = 'Pembukaan oleh pejabat tertinggi...';

    await delay(2000);
    spinner.text = 'Presentasi yang tidak dibaca siapapun...';

    await delay(2000);
    spinner.text = 'Coffee break (ini yang penting)...';

    await delay(2000);
    spinner.text = 'Sesi foto untuk dokumentasi...';

    await delay(1500);
    spinner.text = 'Menyusun kesimpulan yang sudah ditulis dari awal...';

    await delay(1000);
    spinner.succeed(chalk.green('Rapat selesai!'));

    console.log(createBox([
        `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.rapat.successTitle')}`,
        '',
        `📋 ${t('cmd.rapat.results')}:`,
        `├─ ${t('cmd.rapat.decision').padEnd(15)} : ${t('cmd.rapat.decisionNote')}`,
        `├─ ${t('cmd.rapat.actionItems').padEnd(15)} : ${t('cmd.rapat.actionItemsNote')}`,
        `├─ ${t('cmd.rapat.timeline').padEnd(15)} : ${t('cmd.rapat.timelineNote')}`,
        `└─ ${t('cmd.rapat.pic').padEnd(15)} : ${t('cmd.rapat.picNote')}`,
        '',
        `💰 ${t('cmd.rapat.budget')}:`,
        `├─ ${t('cmd.rapat.venue').padEnd(15)} : Rp 50.000.000  ${chalk.green('✓')}`,
        `├─ ${t('cmd.rapat.catering').padEnd(15)} : Rp 30.000.000  ${chalk.green('✓')}`,
        `├─ ${t('cmd.rapat.transport').padEnd(15)} : Rp 20.000.000  ${chalk.green('✓')}`,
        `└─ ${t('cmd.rapat.actualResult').padEnd(15)} : Rp 0           ${chalk.gray('○')}`,
        '',
        chalk.gray(t('cmd.rapat.next'))
    ]));
}

async function handleLelang(options) {
    console.log(chalk.cyan('\n🏷️  TENDER PENGADAAN DEPENDENCY\n'));

    console.log(chalk.yellow(`  📦 Paket     : ${options.paket}`));
    console.log(chalk.yellow(`  💰 Markup    : ${options.markup}%`));
    console.log(chalk.yellow(`  🏢 Peserta   : 1 (vendor terpilih)\n`));

    const spinner = ora({
        text: 'Menyusun HPS (Harga Perkiraan Sendiri)...',
        spinner: 'dots',
        color: 'yellow'
    }).start();

    await delay(2000);
    spinner.text = 'Mengundang vendor koalisi...';

    await delay(1500);
    spinner.text = 'Evaluasi penawaran (formalitas)...';

    await delay(1500);
    spinner.text = 'Negosiasi markup...';

    await delay(1000);
    spinner.text = 'Finalisasi kontrak...';

    await delay(1000);
    spinner.succeed(chalk.green('Tender selesai!'));

    // Simulasi hasil lelang
    const hargaAsli = Math.floor(Math.random() * 900000) + 100000;
    const markup = parseInt(options.markup);
    const hargaAkhir = Math.floor(hargaAsli * (1 + markup / 100));

    console.log(createBox([
        `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.lelang.successTitle')}`,
        '',
        `📋 ${t('cmd.lelang.results')}:`,
        `├─ ${t('cmd.lelang.marketPrice').padEnd(15)} : Rp ${hargaAsli.toLocaleString().padEnd(15)} ${chalk.gray('○ ' + t('cmd.lelang.reference'))}`,
        `├─ ${t('cmd.lelang.markup').padEnd(15)} : ${(markup + '%').padEnd(18)} ${chalk.green('✓ ' + t('cmd.lelang.fair'))}`,
        `├─ ${t('cmd.lelang.contractPrice').padEnd(15)} : Rp ${hargaAkhir.toLocaleString().padEnd(15)} ${chalk.green('✓ ' + t('cmd.lelang.deal'))}`,
        `└─ ${t('cmd.lelang.winner').padEnd(15)} : ${t('cmd.lelang.winnerName')}   ${chalk.green('✓')}`,
        '',
        chalk.gray(t('cmd.lelang.note')),
        chalk.gray(t('cmd.lelang.noteSubtitle'))
    ]));

    // Easter egg: install random dependency dengan markup
    console.log(chalk.gray(`\n  📦 Menginstall dependencies via vendor...\n`));

    await delay(1000);
    console.log(chalk.green(`  ✅ chalk@4.1.2 (harga: Rp ${Math.floor(hargaAsli * 0.3).toLocaleString()})`));
    await delay(500);
    console.log(chalk.green(`  ✅ ora@5.4.1 (harga: Rp ${Math.floor(hargaAsli * 0.3).toLocaleString()})`));
    await delay(500);
    console.log(chalk.green(`  ✅ commander@11.1.0 (harga: Rp ${Math.floor(hargaAsli * 0.4).toLocaleString()})`));

    console.log(chalk.gray(`\n  💰 Total terserap: Rp ${hargaAkhir.toLocaleString()} (termasuk ${markup}% "biaya koordinasi")\n`));
}

async function handleLapor(options) {
    console.log(chalk.cyan('\n📝 PEMBUATAN LAPORAN PRESTASI\n'));

    const spinner = ora({
        text: 'Mengumpulkan data (yang bagus-bagus saja)...',
        spinner: 'dots',
        color: 'blue'
    }).start();

    await delay(2000);
    spinner.text = 'Menyusun narasi positif...';

    await delay(1500);
    spinner.text = 'Menghitung statistik klaim...';

    await delay(1500);
    spinner.text = 'Validasi dengan tim humas...';

    await delay(1000);
    spinner.succeed(chalk.green('Laporan berhasil dibuat!'));

    // Generate fake statistics
    const stats = {
        periode: options.periode,
        uptime: (95 + Math.random() * 5).toFixed(2) + '%',
        errorRate: (Math.random() * 0.5).toFixed(2) + '%',
        kepuasan: (90 + Math.random() * 10).toFixed(1) + '%',
        prestasi: Math.floor(Math.random() * 50) + 50,
        tantangan: 0, // Selalu 0
        anggaran: {
            dialokasikan: 'Rp 10.000.000.000',
            terserap: '98%',
            bocor: '0%',
            menguap: '2%'
        }
    };

    if (options.format === 'json') {
        console.log(chalk.gray('\n  📄 Output JSON:\n'));
        console.log(chalk.white(JSON.stringify(stats, null, 2)));
    } else {
        console.log(createBox([
            chalk.bgBlue.white(` ${t('cmd.lapor.successTitle')} `),
            `${t('cmd.lapor.period')}: ${options.periode}`,
            '',
            `📊 ${t('cmd.lapor.indicators')}:`,
            `├─ ${t('cmd.lapor.uptime').padEnd(15)} : ${stats.uptime.padEnd(10)} ${chalk.green('✓ ' + t('cmd.lapor.uptimeNote'))}`,
            `├─ ${t('cmd.lapor.errorRate').padEnd(15)} : ${stats.errorRate.padEnd(10)} ${chalk.green('✓ ' + t('cmd.lapor.errorRateNote'))}`,
            `├─ ${t('cmd.lapor.satisfaction').padEnd(15)} : ${stats.kepuasan.padEnd(10)} ${chalk.green('✓ ' + t('cmd.lapor.satisfactionNote'))}`,
            `└─ ${t('cmd.lapor.achievement').padEnd(15)} : ${(stats.prestasi + ' item').padEnd(10)} ${chalk.green('✓ ' + t('cmd.lapor.achievementNote'))}`,
            '',
            `⚠️  ${t('cmd.lapor.challenges')}: ${stats.tantangan}`,
            chalk.gray(`(${t('cmd.lapor.challengesNote')})`),
            '',
            `💰 ${t('cmd.lapor.budgetRealization')}:`,
            `├─ ${t('cmd.lapor.allocated').padEnd(15)} : ${stats.anggaran.dialokasikan}`,
            `├─ ${t('cmd.lapor.absorbed').padEnd(15)} : ${stats.anggaran.terserap.padEnd(10)} ${chalk.green('✓')}`,
            `├─ ${t('cmd.lapor.leaked').padEnd(15)} : ${stats.anggaran.bocor.padEnd(10)} ${chalk.green('✓ ' + t('cmd.lapor.leakedNote'))}`,
            `└─ ${t('cmd.lapor.evaporated').padEnd(15)} : ${stats.anggaran.menguap.padEnd(10)} ${chalk.yellow('○ ' + t('cmd.lapor.evaporatedNote'))}`,
            '',
            chalk.gray(t('cmd.lapor.disclaimer'))
        ]));
    }

    // Save report (fake)
    console.log(chalk.gray(`\n  📁 Laporan disimpan di: laporan-${options.periode.replace(' ', '-').toLowerCase()}.pdf`));
    console.log(chalk.gray(`  📤 Siap dikirim ke stakeholder dan media.\n`));
}

async function handleDemo(options) {
    console.log(chalk.cyan('\n📢 PENANGANAN ASPIRASI MASYARAKAT\n'));

    console.log(chalk.red(`  ⚠️  ALERT: Demo terdeteksi!`));
    console.log(chalk.yellow(`  📋 Isu      : ${options.isu}`));
    console.log(chalk.yellow(`  👥 Jumlah   : ${options.jumlah} orang`));
    console.log(chalk.yellow(`  📍 Lokasi   : Depan Gedung Utama\n`));

    const spinner = ora({
        text: 'Mengaktifkan protokol penanganan...',
        spinner: 'dots',
        color: 'red'
    }).start();

    await delay(2000);
    spinner.text = 'Mendatangkan aparat...';
    spinner.color = 'yellow';

    await delay(1500);
    spinner.text = 'Negosiasi dengan koordinator...';

    await delay(2000);
    spinner.text = 'Menjanjikan pertemuan lanjutan...';

    await delay(1500);
    spinner.text = 'Memberikan snack dan air mineral...';

    await delay(1000);
    spinner.text = 'Sesi foto bersama...';

    await delay(1000);
    spinner.succeed(chalk.green('Situasi terkendali!'));

    // Hasil penanganan
    console.log(createBox([
        `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.demo.successTitle')}`,
        '',
        `📋 ${t('cmd.demo.handling')}:`,
        `├─ ${t('cmd.demo.status').padEnd(15)} : ${chalk.green(t('cmd.demo.statusNote'))}`,
        `├─ ${t('cmd.demo.violence').padEnd(15)} : ${chalk.green(t('cmd.demo.violenceNote'))}`,
        `├─ ${t('cmd.demo.dialogue').padEnd(15)} : ${chalk.green('✓ ' + t('cmd.demo.dialogueNote'))}`,
        `└─ ${t('cmd.demo.promise').padEnd(15)} : ${chalk.yellow(t('cmd.demo.promiseNote'))}`,
        '',
        `📝 ${t('cmd.demo.followup')}:`,
        `├─ ${t('cmd.demo.meeting').padEnd(15)} : ${t('cmd.demo.meetingNote')}`,
        `├─ ${t('cmd.demo.timeline').padEnd(15)} : ${t('cmd.demo.timelineNote')}`,
        `└─ ${t('cmd.demo.realization').padEnd(15)} : ${chalk.gray('TBD')}`,
        '',
        `🎯 ${t('cmd.demo.finalResult')}:`,
        `├─ ${t('cmd.demo.result1')}`,
        `├─ ${t('cmd.demo.result2')}`,
        `└─ ${t('cmd.demo.result3')}`,
        '',
        chalk.gray(t('cmd.demo.note')),
        chalk.gray(t('cmd.demo.noteSubtitle'))
    ]));

    // "Silencing" the protest in code terms
    console.log(chalk.gray('\n  🔇 Mengaktifkan noise suppression...\n'));
    await delay(500);
    console.log(chalk.green('  ✅ Console warnings dinonaktifkan'));
    console.log(chalk.green('  ✅ Error logs dialihkan ke /dev/null'));
    console.log(chalk.green('  ✅ Kritik di-rebrand sebagai "masukan konstruktif"'));
    console.log(chalk.gray('\n  📡 Situasi kembali normal. Tidak ada yang perlu dikhawatirkan.\n'));
}

async function handleReshuffle(options) {
    console.log(chalk.cyan('\n🔄 RESHUFFLE KABINET PROCESS\n'));

    console.log(chalk.yellow(`  📋 Alasan   : ${options.alasan}`));
    console.log(chalk.yellow(`  ⏰ Waktu    : Tengah Malam (seperti biasa)`));
    console.log(chalk.yellow(`  📢 Konfirmasi : Sudah di-brief media\n`));

    const spinner = ora({
        text: 'Menyiapkan pengumuman...',
        spinner: 'dots',
        color: 'magenta'
    }).start();

    await delay(1500);
    spinner.text = 'Memanggil process yang akan direshuffle...';

    await delay(2000);
    spinner.text = 'Mengucapkan terima kasih atas pengabdian...';

    await delay(1500);
    spinner.text = 'Memperkenalkan process pengganti...';

    await delay(1000);
    spinner.succeed(chalk.green('Reshuffle selesai!'));

    // Fake process list
    const processes = [
        { pid: Math.floor(Math.random() * 10000), name: 'worker-1', status: 'DIBERHENTIKAN', pengganti: 'worker-1-v2' },
        { pid: Math.floor(Math.random() * 10000), name: 'cache-manager', status: 'DIMUTASI', pengganti: 'cache-manager-trusted' },
        { pid: Math.floor(Math.random() * 10000), name: 'logger', status: 'DIPERTAHANKAN', pengganti: '-' },
    ];

    // Prepare lines for reshuffle table
    const reshuffleLines = [
        `${chalk.green(t('success').toUpperCase() + ':')} ${t('cmd.reshuffle.successTitle')}`,
        '',
        `📋 ${t('cmd.reshuffle.changes')}:`
    ];

    for (const proc of processes) {
        const statusColor = proc.status === 'DIBERHENTIKAN' ? chalk.red :
            proc.status === 'DIMUTASI' ? chalk.yellow : chalk.green;
        reshuffleLines.push(`  PID ${proc.pid} (${proc.name}) : ${statusColor(proc.status)}`);
    }

    reshuffleLines.push('');
    reshuffleLines.push(`📝 ${t('cmd.reshuffle.notes')}:`);
    reshuffleLines.push(`├─ ${t('cmd.reshuffle.fired')}`);
    reshuffleLines.push(`├─ ${t('cmd.reshuffle.mutated')}`);
    reshuffleLines.push(`└─ ${t('cmd.reshuffle.retained')}`);
    reshuffleLines.push('');
    reshuffleLines.push(`⚠️  ${t('cmd.reshuffle.important')}: ${t('cmd.reshuffle.importantNote')}`);
    reshuffleLines.push(t('cmd.reshuffle.importantSubNote'));
    reshuffleLines.push('');
    reshuffleLines.push(chalk.gray(t('cmd.reshuffle.next')));

    console.log(createBox(reshuffleLines));

    // Bonus: actually kill a random process (just kidding, fake it)
    console.log(chalk.gray('\n  🔧 Menjalankan proses teknis...\n'));
    await delay(500);
    console.log(chalk.yellow(`  ⚡ Process worker-1 (PID ${processes[0].pid}) gracefully terminated`));
    await delay(300);
    console.log(chalk.green(`  ✅ Process worker-1-v2 started with fresh mandate`));
    await delay(300);
    console.log(chalk.cyan(`  📋 Handover documentation: "Lanjutkan saja yang sudah ada"`));
    console.log(chalk.gray('\n  📡 Sistem tetap stabil. Rakyat tidak merasakan perubahan.\n'));
}

async function handleSensus() {
    console.log(chalk.cyan(`\n📋 ${t('sensus.title')}\n`));

    const koalisi = state.getKoalisi();

    if (koalisi.length === 0) {
        console.log(chalk.yellow(`  ${t('sensus.empty')}`));
        console.log(chalk.gray(`  ${t('sensus.emptyNote')}\n`));
        return;
    }

    const lines = [
        `${chalk.bold('PID'.padEnd(8))} | ${chalk.bold('SCRIPT'.padEnd(20))} | ${chalk.bold('STATUS'.padEnd(15))} | ${chalk.bold('LOYALTY')}`,
        ''.padEnd(60, '-')
    ];

    let activeCount = 0;

    koalisi.forEach(p => {
        // Cek apakah process masih hidup
        let isAlive = true;
        try {
            process.kill(p.pid, 0);
        } catch (_e) {
            isAlive = false;
        }

        if (!isAlive) {
            // Auto remove dari db kalau mati
            state.kickMember(p.pid);
            return;
        }

        activeCount++;
        lines.push(
            `${p.pid.toString().padEnd(8)} | ${p.name.padEnd(20)} | ${chalk.green(t('sensus.active').padEnd(15))} | ${p.loyalty}`
        );
    });

    if (activeCount === 0) {
        console.log(chalk.yellow(`  ${t('sensus.ghost')}`));
    } else {
        console.log(createBox(lines, { title: t('sensus.boxTitle') }));
        console.log(chalk.gray(`\n  ${t('sensus.total')} ${activeCount}\n`));
    }
}

async function handleLengser(pid) {
    console.log(chalk.red(`\n⚖️  ${t('lengser.title')}\n`));

    const targetPid = parseInt(pid);
    const koalisi = state.getKoalisi();
    const target = koalisi.find(p => p.pid === targetPid);

    if (!target) {
        console.log(chalk.yellow(`  ⚠️  PID ${pid}: ${t('lengser.notFound')}`));
        console.log(chalk.gray(`      ${t('lengser.notFoundNote')}\n`));
        return;
    }

    const spinner = ora({
        text: `${t('lengser.process')} ${target.name} (PID: ${pid})...`,
        spinner: 'shark',
        color: 'red'
    }).start();

    // Note: setTimeout logic wrapped in Promise for testability/awaiting
    await new Promise(resolve => {
        setTimeout(() => {
            try {
                process.kill(targetPid, 'SIGTERM');
                state.kickMember(targetPid);

                spinner.succeed(chalk.green(t('lengser.success')));
                console.log(createBox([
                    chalk.red(`🚫 ${t('lengser.resultTitle')}`),
                    '',
                    `Nama     : ${target.name}`,
                    `Jabatan  : PID ${targetPid}`,
                    `Status   : ${chalk.red(t('lengser.status'))}`,
                    '',
                    chalk.yellow(t('lengser.reason'))
                ]));
            } catch (e) {
                spinner.fail(chalk.red(t('lengser.fail')));
                console.log(chalk.yellow(`  ${t('lengser.failNote')} (Error: ${e.message})`));
                console.log(chalk.gray('  (Mungkin punya bekingan kuat)\n'));
            }
            resolve();
        }, 2000);
    });
}

async function handleSadap(pid) {
    const targetPid = parseInt(pid);
    const koalisi = state.getKoalisi();
    const target = koalisi.find(p => p.pid === targetPid);

    if (!target) {
        console.log(chalk.red(`  ❌ ${t('sadap.notFound')}`));
        return;
    }

    console.log(chalk.cyan(`\n🕵️  ${t('sadap.title')}: ${target.name} (PID: ${pid})\n`));

    // Get log paths
    const logPaths = state.getLogPaths(target.name);

    console.log(chalk.gray(`  Log Output: ${logPaths.out}`));
    console.log(chalk.gray(`  Log Error : ${logPaths.err}\n`));
    console.log(chalk.yellow(`  ${t('sadap.waiting')}\n`));

    // Simple tail implementation
    const tailFile = (filePath, _label) => {
        if (!fs.existsSync(filePath)) return;

        let fileSize = fs.statSync(filePath).size;
        fs.watchFile(filePath, () => {
            const stats = fs.statSync(filePath);
            if (stats.size > fileSize) {
                const stream = fs.createReadStream(filePath, { start: fileSize, end: stats.size });
                stream.on('data', (chunk) => {
                    process.stdout.write(chunk);
                });
                fileSize = stats.size;
            }
        });
    };

    tailFile(logPaths.out, 'OUT');
    tailFile(logPaths.err, 'ERR');

    // Keep process alive logic is usually handled by CLI wait,
    // but here we just return or let it run.
    // In CLI we had setInterval(() => {}, 1000);
    // We can return a promise that never resolves if we want to block,
    // or just return and let the CLI handle it.
    // For testability, maybe we don't want to block forever.
    // We'll leave the blocking to the caller if needed, or add a flag.
    return new Promise(() => { }); // Block forever as per original CLI behavior
}

async function handleSidak(pid) {
    // Clear screen
    console.clear();

    let targets = [];
    const koalisi = state.getKoalisi();

    if (pid) {
        targets = koalisi.filter(p => p.pid === parseInt(pid));
    } else {
        targets = koalisi;
    }

    if (targets.length === 0) {
        console.log(chalk.yellow(`  ${t('sidak.empty')}`));
        return;
    }

    console.log(chalk.cyan(`🔍 ${t('sidak.title')}`));
    console.log(chalk.gray(`  ${t('sidak.exit')}\n`));

    const renderDashboard = () => {
        // Move cursor to top? simple clear is easier for satire
        console.clear();
        console.log(chalk.cyan(`🔍 ${t('sidak.title')}`));
        console.log(chalk.gray(`  ${t('sidak.update')}: ${new Date().toLocaleTimeString()}\n`));

        targets.forEach(t => {
            // Fake stats but looking real
            const cpu = (Math.random() * 5 + 1).toFixed(1) + '%';
            const mem = (Math.random() * 50 + 20).toFixed(1) + ' MB';
            const uptime = Math.floor((Date.now() - t.startTime) / 1000) + 's';

            let status = t('sidak.status.safe');
            try { process.kill(t.pid, 0); } catch (_e) { status = t('sidak.status.gone'); }

            console.log(createBox([
                `${chalk.bold(t.name)} (PID: ${t.pid})`,
                '',
                `Status   : ${status === t('sidak.status.safe') ? chalk.green(status) : chalk.red(status)}`,
                `Uptime   : ${uptime}`,
                `CPU      : ${cpu} ${chalk.green('✓ ' + t('sidak.stats.fair'))}`,
                `Memory   : ${mem} ${chalk.green('✓ ' + t('sidak.stats.absorbed'))}`,
                `${t('sidak.budget')}`
            ]));
        });

        console.log(chalk.gray(`\n  ${t('sidak.monitoring')}`));
    };

    renderDashboard();
    setInterval(renderDashboard, 2000);
    return new Promise(() => { }); // Block forever
}

module.exports = {
    handleLang,
    handleInit,
    handleStart,
    handleAudit,
    handleBansos,
    handleRapat,
    handleLelang,
    handleLapor,
    handleDemo,
    handleReshuffle,
    handleSensus,
    handleLengser,
    handleSadap,
    handleSidak,
    CONFIG_NAME,
    VERSION_REZIM
};
