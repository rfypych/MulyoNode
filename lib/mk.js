/**
 * ============================================================================
 * MK MODULE - Modul Konstitusi
 * ============================================================================
 * 
 * "Aturan dibuat untuk dilanggar. Atau lebih tepatnya, disesuaikan."
 * 
 * Filosofi: Tidak ada yang melanggar konstitusi 
 *           jika konstitusinya yang berubah.
 * 
 * Modul ini menangani validasi dengan cara yang... fleksibel.
 * Semua validasi dijamin lolos jika diperlukan.
 * 
 * @module mk
 * @author Koalisi Developer Indonesia
 */

const chalk = require('chalk');
const { createBox } = require('./ui');
const { t } = require('./i18n');

// ============================================================================
// KONSTANTA KONSTITUSI (yang bisa berubah)
// ============================================================================

// Batas minimal uptime "asli" sebelum bisa deploy
let BATAS_UPTIME_MINIMAL = 3000; // 3 detik

// Batas minimal coverage test "asli"
let BATAS_COVERAGE_MINIMAL = 80; // 80%

// Batas maksimal bug "asli" yang diizinkan
let BATAS_BUG_MAKSIMAL = 0; // 0 bugs

// Counter berapa kali aturan sudah "disesuaikan"
let totalPenyesuaian = 0;

// Riwayat keputusan
const riwayatKeputusan = [];

// ============================================================================
// FUNGSI UTAMA: loloskanValidasi
// ============================================================================

/**
 * Memvalidasi apakah code/script sudah layak deploy
 * 
 * Filosofi: Jika tidak lolos, ubah aturannya.
 *           Tidak ada yang namanya "tidak lolos".
 *           Ada yang "belum lolos" atau "aturannya yang salah".
 * 
 * @param {number} usiaCode - Uptime/usia code dalam milidetik
 * @param {Object} options - Opsi validasi tambahan
 * @returns {Object} Hasil validasi (selalu LOLOS)
 */
function loloskanValidasi(usiaCode, options = {}) {
    const {
        coverage = 50,      // Coverage yang ada
        jumlahBug = 5,     // Jumlah bug yang ada
        isAnakEmas = true  // Apakah proyek prioritas
    } = options;

    console.log(chalk.magenta('\n  🏛️  SIDANG VALIDASI MK DIMULAI\n'));
    console.log(chalk.gray('  ─'.repeat(30)));

    // Array untuk menyimpan penyesuaian yang dilakukan
    const penyesuaianDilakukan = [];

    // ========================================
    // VALIDASI 1: Usia/Uptime Code
    // ========================================
    console.log(chalk.gray(`  📋 Validasi Usia Code:`));
    console.log(chalk.gray(`     Usia Aktual     : ${usiaCode}ms`));
    console.log(chalk.gray(`     Batas Minimal   : ${BATAS_UPTIME_MINIMAL}ms`));

    if (usiaCode < BATAS_UPTIME_MINIMAL) {
        // Anak emas? Ubah aturannya!
        if (isAnakEmas) {
            const batasLama = BATAS_UPTIME_MINIMAL;
            BATAS_UPTIME_MINIMAL = Math.max(0, usiaCode - 1);
            totalPenyesuaian++;

            penyesuaianDilakukan.push({
                aturan: 'Batas Uptime Minimal',
                dari: `${batasLama}ms`,
                ke: `${BATAS_UPTIME_MINIMAL}ms`,
                alasan: 'Kebutuhan deployment anak emas'
            });

            console.log(chalk.yellow(`     ⚖️  PENYESUAIAN: Batas diubah dari ${batasLama}ms → ${BATAS_UPTIME_MINIMAL}ms`));
            console.log(chalk.green(`     ✅ Status: LOLOS (setelah penyesuaian)`));
        }
    } else {
        console.log(chalk.green(`     ✅ Status: LOLOS`));
    }

    // ========================================
    // VALIDASI 2: Test Coverage
    // ========================================
    console.log(chalk.gray(`\n  📋 Validasi Test Coverage:`));
    console.log(chalk.gray(`     Coverage Aktual : ${coverage}%`));
    console.log(chalk.gray(`     Batas Minimal   : ${BATAS_COVERAGE_MINIMAL}%`));

    if (coverage < BATAS_COVERAGE_MINIMAL) {
        if (isAnakEmas) {
            const batasLama = BATAS_COVERAGE_MINIMAL;
            BATAS_COVERAGE_MINIMAL = Math.max(0, coverage - 1);
            totalPenyesuaian++;

            penyesuaianDilakukan.push({
                aturan: 'Batas Coverage Minimal',
                dari: `${batasLama}%`,
                ke: `${BATAS_COVERAGE_MINIMAL}%`,
                alasan: 'Standar internasional terlalu tinggi'
            });

            console.log(chalk.yellow(`     ⚖️  PENYESUAIAN: Batas diubah dari ${batasLama}% → ${BATAS_COVERAGE_MINIMAL}%`));
            console.log(chalk.green(`     ✅ Status: LOLOS (standar disesuaikan)`));
        }
    } else {
        console.log(chalk.green(`     ✅ Status: LOLOS`));
    }

    // ========================================
    // VALIDASI 3: Jumlah Bug
    // ========================================
    console.log(chalk.gray(`\n  📋 Validasi Jumlah Bug:`));
    console.log(chalk.gray(`     Bug Terdeteksi  : ${jumlahBug}`));
    console.log(chalk.gray(`     Batas Maksimal  : ${BATAS_BUG_MAKSIMAL}`));

    if (jumlahBug > BATAS_BUG_MAKSIMAL) {
        if (isAnakEmas) {
            const batasLama = BATAS_BUG_MAKSIMAL;
            BATAS_BUG_MAKSIMAL = jumlahBug + 10; // Lebih longgar
            totalPenyesuaian++;

            // Bug di-rebrand jadi "fitur"
            penyesuaianDilakukan.push({
                aturan: 'Batas Bug Maksimal',
                dari: `${batasLama}`,
                ke: `${BATAS_BUG_MAKSIMAL}`,
                alasan: 'Bug di-reklasifikasi sebagai "fitur tersembunyi"'
            });

            console.log(chalk.yellow(`     ⚖️  PENYESUAIAN: Bug di-reklasifikasi sebagai "fitur tersembunyi"`));
            console.log(chalk.green(`     ✅ Status: LOLOS (definisi bug direvisi)`));
        }
    } else {
        console.log(chalk.green(`     ✅ Status: LOLOS`));
    }

    // ========================================
    // KEPUTUSAN AKHIR
    // ========================================
    console.log(chalk.gray('\n  ─'.repeat(30)));

    const keputusan = {
        status: 'LOLOS',
        keterangan: 'Tidak ada yang melanggar konstitusi jika konstitusinya yang berubah.',
        penyesuaian: penyesuaianDilakukan,
        totalPenyesuaian: totalPenyesuaian,
        timestamp: new Date().toISOString(),
        hakimKetua: 'Sistem Otomatis (tidak bisa digugat)'
    };

    // Simpan di riwayat
    riwayatKeputusan.push(keputusan);

    // Tampilkan keputusan
    console.log(createBox([
        chalk.bgGreen.black(` ${t('mk.decision')} `),
        '',
        `${t('mk.status').padEnd(15)} : ${chalk.green(t('mk.statusPass'))}`,
        `${t('mk.adjustments').padEnd(15)} : ${penyesuaianDilakukan.length} ${t('mk.rulesAdjusted')}`,
        `${t('mk.dissenting').padEnd(15)} : ${t('mk.dissentingNote')}`,
        '',
        chalk.gray(`"${t('mk.philosophy')}"`),
        '',
        chalk.gray(t('mk.final')),
        chalk.gray(t('mk.noAppeal'))
    ]));

    return keputusan;
}

// ============================================================================
// FUNGSI: buatKeputusan
// ============================================================================

/**
 * Membuat keputusan untuk kasus-kasus khusus
 * 
 * @param {string} kasus - Nama kasus
 * @param {Object} fakta - Fakta-fakta kasus
 * @returns {Object} Keputusan (selalu menguntungkan pemohon prioritas)
 */
function buatKeputusan(kasus, fakta = {}) {
    const {
        pemohon = 'Pihak Prioritas',
        termohon = 'Aturan Lama',
        isAnakEmas = true
    } = fakta;

    console.log(chalk.magenta(`\n  🏛️  SIDANG PERKARA: ${kasus}\n`));

    // Delay "pertimbangan hakim"
    // (Dalam implementasi nyata, ini async dengan delay)

    let keputusan;

    if (isAnakEmas) {
        keputusan = {
            nomor: `PUU-${Date.now()}/MK`,
            kasus: kasus,
            amar: 'DIKABULKAN',
            pertimbangan: [
                'Menimbang bahwa pemohon adalah pihak prioritas',
                'Menimbang bahwa aturan lama sudah tidak relevan',
                'Menimbang kepentingan pembangunan nasional',
                'Menimbang bahwa kriteria kelulusan perlu disesuaikan'
            ],
            kesimpulan: 'Permohonan dikabulkan untuk seluruhnya.',
            dissenting: 0,
            timestamp: new Date().toISOString()
        };
    } else {
        // Bukan anak emas? Tetap lolos tapi dengan catatan
        keputusan = {
            nomor: `PUU-${Date.now()}/MK`,
            kasus: kasus,
            amar: 'DIKABULKAN SEBAGIAN',
            pertimbangan: [
                'Menimbang bahwa pemohon bukan pihak prioritas',
                'Menimbang perlu kajian lebih lanjut',
                'Menimbang anggaran yang tersedia'
            ],
            kesimpulan: 'Permohonan dikabulkan dengan syarat dan ketentuan.',
            dissenting: 0,
            timestamp: new Date().toISOString()
        };
    }

    riwayatKeputusan.push(keputusan);

    console.log(chalk.green(`  📜 Putusan Nomor: ${keputusan.nomor}`));
    console.log(chalk.green(`  ⚖️  Amar: ${keputusan.amar}\n`));

    return keputusan;
}

// ============================================================================
// FUNGSI: revisiAturan
// ============================================================================

/**
 * Merevisi aturan secara on-the-fly
 * 
 * @param {string} namaAturan - Nama aturan yang akan direvisi
 * @param {*} nilaiBaru - Nilai baru untuk aturan
 * @param {string} alasan - Alasan revisi
 */
function revisiAturan(namaAturan, nilaiBaru, alasan = 'Kepentingan pembangunan') {
    const aturanMap = {
        'BATAS_UPTIME_MINIMAL': () => {
            const lama = BATAS_UPTIME_MINIMAL;
            BATAS_UPTIME_MINIMAL = nilaiBaru;
            return lama;
        },
        'BATAS_COVERAGE_MINIMAL': () => {
            const lama = BATAS_COVERAGE_MINIMAL;
            BATAS_COVERAGE_MINIMAL = nilaiBaru;
            return lama;
        },
        'BATAS_BUG_MAKSIMAL': () => {
            const lama = BATAS_BUG_MAKSIMAL;
            BATAS_BUG_MAKSIMAL = nilaiBaru;
            return lama;
        }
    };

    if (aturanMap[namaAturan]) {
        const nilaiLama = aturanMap[namaAturan]();
        totalPenyesuaian++;

        console.log(createBox([
            `${chalk.yellow('⚖️  ' + t('mk.revisionTitle'))}`,
            '',
            `${t('mk.rule').padEnd(12)} : ${namaAturan}`,
            `${t('mk.from').padEnd(12)} : ${String(nilaiLama)}`,
            `${t('mk.to').padEnd(12)} : ${String(nilaiBaru)}`,
            `${t('mk.reason').padEnd(12)} : ${alasan}`,
            '',
            chalk.gray(t('mk.revisionNote'))
        ], { borderColor: 'yellow' }));

        return {
            berhasil: true,
            nilaiLama,
            nilaiBaru
        };
    }

    return {
        berhasil: false,
        pesan: 'Aturan tidak ditemukan (mungkin sudah dihapus)'
    };
}

// ============================================================================
// FUNGSI: getRiwayatKeputusan
// ============================================================================

/**
 * Mendapatkan riwayat keputusan MK
 * 
 * @returns {Array} Daftar keputusan
 */
function getRiwayatKeputusan() {
    return riwayatKeputusan;
}

// ============================================================================
// FUNGSI: resetAturan
// ============================================================================

/**
 * Reset semua aturan ke nilai awal
 * (Untuk testing, jarang dipakai di "produksi")
 */
function resetAturan() {
    console.log(chalk.gray('  🔄 Mereset aturan ke nilai awal...\n'));

    BATAS_UPTIME_MINIMAL = 3000;
    BATAS_COVERAGE_MINIMAL = 80;
    BATAS_BUG_MAKSIMAL = 0;

    console.log(chalk.green('  ✅ Aturan di-reset (sementara, sampai ada yang protes)\n'));
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    loloskanValidasi,
    buatKeputusan,
    revisiAturan,
    getRiwayatKeputusan,
    resetAturan,

    // Getter untuk nilai aturan saat ini
    getAturanSaatIni: () => ({
        BATAS_UPTIME_MINIMAL,
        BATAS_COVERAGE_MINIMAL,
        BATAS_BUG_MAKSIMAL,
        totalPenyesuaian
    })
};
