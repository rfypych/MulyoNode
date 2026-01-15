# Panduan Kontribusi (Guideline Pembangunan)

Terima kasih telah berminat untuk bergabung dalam **Koalisi Developer Indonesia**.
Kontribusi Anda akan dicatat sebagai amal jariyah (dan portofolio).

## 🏗️ Cara Menambah Command Baru

1.  **Buat Handler**: Tambahkan fungsi handler baru di `lib/handlers.js`.
    *   Gunakan `logger.info`, `logger.warn`, atau `logger.box` untuk output.
    *   Jangan gunakan `console.log` mentah kecuali terpaksa.
2.  **Daftarkan Command**: Edit `bin/mulyo` untuk mendaftarkan command baru menggunakan Commander.js.
3.  **Testing**:
    *   Buat unit test di `tests/lib/handlers.test.js`.
    *   Pastikan coverage cukup (atau setidaknya terlihat hijau).

## 🧪 Menjalankan Test

Untuk memastikan stabilitas nasional (dan kode), jalankan:

```bash
npm run test:unit
```

Ini akan menjalankan:
1.  **Unit Tests**: Menguji logika per modul secara terisolasi.
2.  **Integration Tests**: Menguji spawning process asli (hati-hati, ini menggunakan real process).

## 📝 Gaya Kode (Code Style)

- Gunakan **ESLint** dan **Prettier**.
- Variabel satir sangat disarankan (contoh: `const anggaranBocor`, `function lobiPolitik()`).
- Komentar kode harus menjelaskan "mengapa", bukan hanya "bagaimana" (tambah poin plus jika komentarnya lucu).

## 🚀 Pull Request

- Pastikan PR Anda memiliki judul yang bombastis (contoh: "Mega Proyek Refactor", "Hilirisasi Algoritma").
- Deskripsi PR harus meyakinkan bahwa perubahan ini demi kepentingan rakyat banyak.
- Tunggu approval dari "Pusat" (Maintainer).

---
*"Kerja, Kerja, Kerja (Tipes)"*
