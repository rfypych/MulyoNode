# MulyoNode 🏛️

> "Runtime yang stabil seperti koalisi gemuk."
> "Tidak ada masalah jika tidak ada yang melaporkan."

MulyoNode adalah sebuah satirical process manager untuk Node.js (seperti PM2 tapi korup) yang bertema politik Indonesia.

## 📦 Fitur Unggulan

- **Anak Emas Mode**: Memberikan prioritas CPU tertinggi (bukan nepotisme, tapi meritokrasi terpimpin).
- **Koalisi Gemuk Memory**: Mengizinkan penggunaan memori "unlimited" (technically 512MB limit, but let's call it unlimited for branding).
- **Auto-Bansos**: Otomatis restart jika crash (dibranding sebagai "blusukan").
- **Audit WTP**: Selalu lolos audit (Wajar Tanpa Pengecualian).

## 🚀 Instalasi

```bash
npm install -g mulyonode
```

## 🎮 Penggunaan

### Memulai Proyek (Pembangunan Infrastruktur)

```bash
mulyo init
```
Akan membuat file `revolusi-mental.config.js` yang berisi konfigurasi rezim.

### Menjalankan Script (Peluncuran Program Prioritas)

```bash
mulyo start server.js
```
Opsi tambahan:
- `--gerilya`: Jalankan di background (mode ordal).
- `--delay <ms>`: Delay blusukan (restart delay).

### Monitoring (Sensus & Sidak)

```bash
mulyo sensus
mulyo sidak
```

### Audit (Laporan Kinerja)

```bash
mulyo audit
```

## 🏗️ Arsitektur

### Struktur Direktori

- `bin/mulyo`: Entry point CLI.
- `lib/`:
  - `process-manager.js`: Core logic untuk spawn dan restart process ("Dinasti").
  - `config.js`: Loader konfigurasi yang memetakan istilah politik ke teknis.
  - `state.js`: Database json sederhana (`~/.mulyo/ordal.json`) untuk menyimpan state process.
  - `handlers.js`: CLI command handlers.
  - `logger.js`: Centralized logger dengan nuansa satir.
- `tests/`: Unit dan Integration tests.

### Konfigurasi (revolusi-mental.config.js)

| Istilah Satir | Makna Teknis | Default |
|---------------|--------------|---------|
| `koalisiGemuk` | Memory Limit (512MB) | `true` |
| `anakEmas` | CPU Priority (High) | `true` |
| `modeBlusukan` | Restart Delay (1s / 5s) | `'superfisial'` |
| `toleransiKritik`| Show Errors (Stderr) | `false` |

## 🤝 Contributing

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan kontribusi.
Pastikan code anda "santun" dan mengikuti arahan pimpinan.

## 📝 License

WTFPL (Do What The Fuck You Want To Public License) - Tapi tetap dalam pengawasan.
