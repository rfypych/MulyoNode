const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const CONFIG_NAME = 'revolusi-mental.config.js';

class ConfigLoader {
  constructor() {
    this.configPath = path.join(process.cwd(), CONFIG_NAME);
    this.defaultConfig = {
      rezim: 'otoriter',
      anakEmas: true,
      koalisiGemuk: true,
      toleransiKritik: false,
      modeBlusukan: 'superfisial',
      statusAudit: 'WTP',
      anggaranBansos: '1GB',
      menjelangPilkada: true,
      markupAnggaran: 30,
      vendorPengadaan: 'PT. Koalisi Sejahtera',
      logLevel: 'terbatas'
    };
  }

  load() {
    if (fs.existsSync(this.configPath)) {
      try {
        const userConfig = require(this.configPath);
        return { ...this.defaultConfig, ...userConfig };
      } catch (err) {
        logger.warn('Konfigurasi tidak valid, menggunakan default', err.message);
        return this.defaultConfig;
      }
    }
    return this.defaultConfig;
  }

  /**
   * Map satirical config to technical values
   */
  getTechnicalConfig(config) {
    return {
      // koalisiGemuk: true -> Limit memory to 512MB (Hypocrisy at its finest)
      maxMemory: config.koalisiGemuk ? 512 : 1024,

      // anakEmas: true -> High Priority
      priority: config.anakEmas ? 'high' : 'normal',

      // modeBlusukan -> Restart Delay
      restartDelay: config.modeBlusukan === 'superfisial' ? 1000 : 5000,

      // toleransiKritik -> Log Level / Error Visibility
      showErrors: config.toleransiKritik,

      env: {
        NODE_ENV: 'production', // Always production ready
        REZIM: config.rezim
      }
    };
  }

  createDefault() {
    const content = `/**
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
  // (Technical: Sets --max-old-space-size=512)
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
  statusAudit: 'WTP',
};
`;
    fs.writeFileSync(this.configPath, content);
    return true;
  }
}

module.exports = new ConfigLoader();
