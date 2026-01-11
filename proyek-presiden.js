/**
 * PROYEK STRATEGIS NASIONAL (Dummy)
 * 
 * Script ini mensimulasikan pekerjaan negara yang tidak kunjung selesai.
 * Digunakan untuk testing 'mulyo start'.
 */

console.log('--- MEMULAI PROYEK ---');
console.log('Status: Groundbreaking...');

let progress = 0;

setInterval(() => {
    progress += 10; // Progress lambat
    console.log(`[PROYEK] Progress pembangunan: ${progress}% (Anggaran terserap: ${progress * 5}%)`);

    if (Math.random() < 0.2) {
        console.warn('[WARNING] Ada sedikit gejolak sosial (diabaikan).');
    }

    if (Math.random() < 0.1) {
        console.error('[ERROR] Krisis global! (Alasan untuk mangkrak)');
        // Crash satir
        process.exit(1);
    }
}, 2000);
