# Changelog

Semua perubahan penting pada proyek ini akan didokumentasikan di file ini.

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan proyek ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
(dengan penyesuaian sesuai kebutuhan).

---

## [1.0.9] - 2026-01-11

### 🏗️ Pembangunan Infrastruktur (Architectural Refactor)
- **Modular Architecture**: Split concerns into dedicated modules:
  - `lib/process-manager.js` (Class-based Process Manager with auto-restart logic)
  - `lib/logger.js` (Centralized satirical logger)
  - `lib/config.js` (Robust config loading with technical mapping)
  - `lib/handlers.js` (Clean separation of command logic)
- **Core Logic Upgrade**: Replaced legacy `dynasty.js` with `ProcessManager` for better stability and testability.

### 🧪 Pengawasan Internal (Testing Enhancement)
- **Integration Tests**: Added real process spawning tests in `tests/integration/process-manager.test.js` to verify auto-restart and lifecycle management.
- **CLI Tests**: Added command execution tests in `tests/integration/commands.test.js`.
- **Unit Test Coverage**: Updated existing unit tests to support new architecture.

### 📚 Dokumen Negara (Documentation)
- **Professional English Docs**: Restored `README.md` and `SECURITY.md` to professional English while preserving the satirical context within descriptions.
- **Contribution Guidelines**: Added `CONTRIBUTING.md` (in English) to guide new developers.
- **Logo Restoration**: Fixed missing assets in documentation.

### 🛡️ Pertahanan (CI/CD & Reliability)
- **Enhanced Pipeline**: Updated `.github/workflows/pengawasan-melekat.yml` to include Linting, Unit & Integration Tests, and Security Audit steps.
- **Config Mapping**: `revolusi-mental.config.js` fields now map to actual technical limits (e.g., `koalisiGemuk` -> 512MB limit, `anakEmas` -> Priority).
- **Clean Publishing**: Updated `.npmignore` to exclude development artifacts.

---

## [1.0.0-periode-3] - 2026-01-11

### 🎉 Diresmikan (Added)
- **CLI Commands:**
  - `mulyo init` - Membangun infrastruktur folder
  - `mulyo start <script>` - Menjalankan script dengan privilege anak emas
  - `mulyo audit` - Audit yang selalu WTP
  - `mulyo bansos` - Gelontorkan bantuan buffer
  - `mulyo rapat` - Simulasi rapat koordinasi
  - `mulyo lelang` - Tender vendor pengadaan dependency
  - `mulyo lapor` - Generate laporan prestasi
  - `mulyo demo` - Simulasi penanganan demo
  - `mulyo reshuffle` - Rotasi process secara tiba-tiba

- **Core Modules:**
  - `lib/dynasty.js` - Child process dengan nepotisme
  - `lib/cawe-cawe.js` - Intervensi global error
  - `lib/mk.js` - Validasi yang selalu lolos

- **Documentation:**
  - README.md dengan filosofi bilingual (ID/EN)
  - LICENSE (WTFPL dengan addendum khusus)

### 🔧 Disesuaikan (Changed)
- Error messages di-rebrand menjadi "Tantangan"
- Crash di-rebrand menjadi "Blusukan"
- Bug di-reklasifikasi sebagai "Fitur Tersembunyi"

### 🗑️ Dihapus (Removed)
- Transparansi (tidak diperlukan)
- Akuntabilitas (menghambat pembangunan)
- Exit on error (destabilisasi)

### 🔒 Diamankan (Security)
- Semua log sensitif disimpan di `logRahasia` (tidak untuk publik)
- Hasil audit bersifat final dan tidak dapat digugat

---

## [0.9.0-beta] - 2026-01-10

### 🏗️ Pembangunan Awal
- Inisialisasi proyek berdasarkan filosofi SawitDB
- Riset pattern Agricultural Query Language
- Desain arsitektur "Politik Dinasti"

---

## Roadmap (Akan Dirapat-kan)

### [1.1.0] - TBD
- [ ] Integrasi dengan SawitDB untuk persistent storage
- [ ] Mode "Kampanye" untuk deployment menjelang Pilkada
- [ ] Dashboard real-time (hanya menampilkan yang bagus-bagus)

### [2.0.0] - TBD
- [ ] Distributed mode (koalisi antar-server)
- [ ] Blockchain audit trail (immutable, tapi bisa di-fork)
- [ ] AI-powered excuse generator

---

**Catatan:** Changelog ini bersifat ilustratif dan tidak dapat dijadikan bukti hukum.
