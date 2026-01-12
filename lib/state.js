/**
 * ============================================================================
 * STATE MODULE - Database "Ordal" (Orang Dalam)
 * ============================================================================
 * 
 * Modul ini berfungsi untuk mencatat siapa saja "Anak Emas" yang sedang
 * berjalan di background. Data disimpan di `~/.mulyo/ordal.json`.
 * 
 * Filosofi:
 * "Data transparan, tapi cuma buat kalangan sendiri."
 * 
 * @module state
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Lokasi "Buku Hitam" (Database)
const MULYO_HOME = path.join(os.homedir(), '.mulyo');
const ORDAL_DB = path.join(MULYO_HOME, 'ordal.json');
const LOG_DIR = path.join(MULYO_HOME, 'logs');

// Pastikan infrastruktur siap (Folder .mulyo)
function ensureInfrastructure() {
    if (!fs.existsSync(MULYO_HOME)) {
        fs.mkdirSync(MULYO_HOME, { recursive: true });
    }
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDAL_DB)) {
        fs.writeFileSync(ORDAL_DB, JSON.stringify([], null, 2));
    }
}

/**
 * Baca data Ordal terbaru
 * @returns {Array} Daftar proses aktif
 */
function getKoalisi() {
    ensureInfrastructure();
    try {
        const data = fs.readFileSync(ORDAL_DB, 'utf8');
        return JSON.parse(data);
    } catch (_error) {
        return [];
    }
}

/**
 * Simpan data Ordal
 * @param {Array} data - Daftar proses baru
 */
function saveKoalisi(data) {
    ensureInfrastructure();
    fs.writeFileSync(ORDAL_DB, JSON.stringify(data, null, 2));
}

/**
 * Tambah "Anak Emas" baru ke koalisi
 * @param {Object} processInfo
 */
function recruitMember(processInfo) {
    const koalisi = getKoalisi();
    koalisi.push({
        ...processInfo,
        joinedAt: new Date().toISOString(),
        status: 'AMAN (Dilindungi)',
        loyalty: '100%',
        restarts: 0
    });
    saveKoalisi(koalisi);
}

/**
 * Pecat anggota koalisi (Remove process)
 * @param {number} pid 
 */
function kickMember(pid) {
    let koalisi = getKoalisi();
    koalisi = koalisi.filter(p => p.pid !== pid);
    saveKoalisi(koalisi);
}

/**
 * Update status anggota
 * @param {number} pid 
 * @param {Object} updates 
 */
function updateMember(pid, updates) {
    const koalisi = getKoalisi();
    const index = koalisi.findIndex(p => p.pid === pid);
    if (index !== -1) {
        koalisi[index] = { ...koalisi[index], ...updates };
        saveKoalisi(koalisi);
    }
}

/**
 * Dapatkan path log untuk anggota tertentu
 * @param {string} name 
 * @returns {Object} { out, err } paths
 */
function getLogPaths(name) {
    ensureInfrastructure();
    const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return {
        out: path.join(LOG_DIR, `${safeName}.out.log`),
        err: path.join(LOG_DIR, `${safeName}.err.log`)
    };
}

module.exports = {
    getKoalisi,
    recruitMember,
    kickMember,
    updateMember,
    getLogPaths,
    LOG_DIR
};
