const mk = require('../../lib/mk');

describe('MK Module (Modul Konstitusi)', () => {
    beforeEach(() => {
        // Reset rules before each test
        mk.resetAturan();
    });

    test('loloskanValidasi should pass if criteria are met', () => {
        const result = mk.loloskanValidasi(5000, { coverage: 90, jumlahBug: 0 });
        expect(result.status).toBe('LOLOS');
        expect(result.penyesuaian).toHaveLength(0);
    });

    test('loloskanValidasi should adjust rules for Anak Emas (priority)', () => {
        // Uptime < 3000ms should fail normally, but pass for anakEmas with adjustment
        const result = mk.loloskanValidasi(100, { coverage: 90, jumlahBug: 0, isAnakEmas: true });

        expect(result.status).toBe('LOLOS');
        expect(result.penyesuaian.length).toBeGreaterThan(0);
        expect(result.penyesuaian[0].aturan).toBe('Batas Uptime Minimal');

        // Check if global rule was actually changed
        expect(mk.getAturanSaatIni().BATAS_UPTIME_MINIMAL).toBeLessThan(3000);
    });

    test('loloskanValidasi should adjust coverage rules', () => {
        const result = mk.loloskanValidasi(5000, { coverage: 10, jumlahBug: 0, isAnakEmas: true });

        expect(result.status).toBe('LOLOS');
        const adjustments = result.penyesuaian.find(a => a.aturan === 'Batas Coverage Minimal');
        expect(adjustments).toBeDefined();
        expect(mk.getAturanSaatIni().BATAS_COVERAGE_MINIMAL).toBeLessThan(80);
    });

    test('loloskanValidasi should reclassify bugs', () => {
        const result = mk.loloskanValidasi(5000, { coverage: 90, jumlahBug: 100, isAnakEmas: true });

        expect(result.status).toBe('LOLOS');
        const adjustments = result.penyesuaian.find(a => a.aturan === 'Batas Bug Maksimal');
        expect(adjustments).toBeDefined();
        expect(mk.getAturanSaatIni().BATAS_BUG_MAKSIMAL).toBeGreaterThan(0);
    });

    test('buatKeputusan should favor priority applicant', () => {
        const keputusan = mk.buatKeputusan('Sengketa Pilpres', { isAnakEmas: true });
        expect(keputusan.amar).toBe('DIKABULKAN');
        expect(keputusan.kesimpulan).toContain('dikabulkan untuk seluruhnya');
    });

    test('buatKeputusan should partially grant non-priority applicant', () => {
        const keputusan = mk.buatKeputusan('Sengketa Biasa', { isAnakEmas: false });
        expect(keputusan.amar).toBe('DIKABULKAN SEBAGIAN');
    });

    test('revisiAturan should manually change rules', () => {
        const result = mk.revisiAturan('BATAS_UPTIME_MINIMAL', 100, 'Tes Revisi');
        expect(result.berhasil).toBe(true);
        expect(mk.getAturanSaatIni().BATAS_UPTIME_MINIMAL).toBe(100);
    });

    test('revisiAturan should fail for unknown rule', () => {
        const result = mk.revisiAturan('ATURAN_NGARANG', 100);
        expect(result.berhasil).toBe(false);
    });

    test('getRiwayatKeputusan should return history', () => {
        mk.buatKeputusan('Case 1', { isAnakEmas: true });
        const history = mk.getRiwayatKeputusan();
        expect(history.length).toBeGreaterThan(0);
        expect(history[history.length - 1].kasus).toBe('Case 1');
    });
});
