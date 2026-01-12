const cawe = require('../../lib/cawe-cawe');

describe('Cawe-Cawe Module', () => {
    // Mock console methods
    let originalConsoleLog;
    let originalConsoleError;
    let originalConsoleWarn;
    let logSpy;
    let errorSpy;
    let warnSpy;

    beforeEach(() => {
        originalConsoleLog = console.log;
        originalConsoleError = console.error;
        originalConsoleWarn = console.warn;
        logSpy = jest.fn();
        errorSpy = jest.fn();
        warnSpy = jest.fn();

        console.log = logSpy;
        console.error = errorSpy;
        console.warn = warnSpy;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
    });

    test('ubahFraming should rebrand negative words', () => {
        expect(cawe.ubahFraming('Error occurred')).toBe('Tantangan occurred');
        expect(cawe.ubahFraming('System Crash')).toBe('System Blusukan');
        expect(cawe.ubahFraming('Huge Korupsi')).toBe('Huge Optimalisasi Anggaran');
    });

    test('intervensiGlobal should register handlers', () => {
        // We can't easily test process.on directly without messing up the test runner,
        // but we can check if the function runs without error and sets the state.

        // Note: calling intervensiGlobal attaches listeners to the actual process.
        // In a real unit test suite, this is dangerous.
        // We will mock process.on.

        const originalOn = process.on;
        const onSpy = jest.fn();
        process.on = onSpy;

        cawe.intervensiGlobal();

        expect(onSpy).toHaveBeenCalledWith('uncaughtException', expect.any(Function));
        expect(onSpy).toHaveBeenCalledWith('unhandledRejection', expect.any(Function));
        expect(onSpy).toHaveBeenCalledWith('warning', expect.any(Function));

        process.on = originalOn;
    });

    test('pasangPengawasan should intercept console logging', () => {
        cawe.pasangPengawasan({ ubahNegatif: true });

        // Trigger the intercepted console.log
        console.log('Server Error');

        // Check if the spy (which we assigned to console.log BEFORE pasangPengawasan?)
        // Wait, pasangPengawasan replaces console.log.
        // But our beforeEach ALREADY replaced console.log with logSpy.
        // So pasangPengawasan will wrap OUR logSpy.

        // When we call console.log('Server Error'), it goes to:
        // NewConsoleLog -> (modifies text) -> OldConsoleLog (which is logSpy)

        // So logSpy should receive the MODIFIED text.
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Tantangan'));
    });

    test('getLogRahasia should protect access', () => {
        expect(cawe.getLogRahasia('wrong-key')).toBeNull();
        expect(cawe.getLogRahasia('inner-circle-2026')).toBeInstanceOf(Array);
    });

    test('laporkanStatistik should return curated stats', () => {
        const stats = cawe.laporkanStatistik();
        expect(stats.statusSistem).toBe('STABIL');
        expect(stats.kepuasanRakyat).toBe('99%');
    });
});
