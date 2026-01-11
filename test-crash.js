/**
 * Test Script - Untuk menguji MulyoNode
 * 
 * Script ini akan crash setelah beberapa detik
 * untuk menguji fitur auto-restart "blusukan"
 */

console.log('🚀 Script dijalankan dengan privilege anak emas!');
console.log('📍 PID:', process.pid);
console.log('🏛️  Mode:', process.env.ANAK_EMAS === 'true' ? 'ANAK EMAS' : 'RAKYAT BIASA');
console.log('');

// Counter
let counter = 0;

// Simulasi aplikasi berjalan
const interval = setInterval(() => {
    counter++;
    console.log(`⏱️  Tick ${counter}: Aplikasi berjalan normal...`);

    // Crash setelah 5 tick untuk demo
    if (counter >= 5) {
        console.log('');
        console.log('💥 Simulasi crash (untuk demo blusukan)...');
        clearInterval(interval);

        // Throw error untuk trigger crash
        throw new Error('Aplikasi mengalami "tantangan" teknis');
    }
}, 1000);

console.log('⏳ Menunggu crash dalam 5 detik (untuk demo)...');
console.log('');
