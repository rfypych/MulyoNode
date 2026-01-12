describe('i18n Module', () => {
    let i18n;
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };

        // Mock environment for predictable detection
        delete process.env.MULYO_LANG;
        delete process.env.LANG;
        delete process.env.LANGUAGE;

        i18n = require('../../lib/i18n');
        i18n.setLanguage('id'); // Default reset
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    test('detectLanguage should return a valid language code', () => {
        // Ensure environment is clean
        process.env.LANG = 'en_US.UTF-8';
        // Reload module to trigger detection logic if it's top-level
        // But the function detectLanguage is exported, so we just call it.
        const lang = i18n.detectLanguage();
        expect(lang).toBe('en');
    });

    test('setLanguage should change current language', () => {
        expect(i18n.setLanguage('en')).toBe(true);
        expect(i18n.getLanguage()).toBe('en');

        expect(i18n.setLanguage('id')).toBe(true);
        expect(i18n.getLanguage()).toBe('id');
    });

    test('setLanguage should return false for invalid language', () => {
        expect(i18n.setLanguage('jp')).toBe(false);
        expect(i18n.getLanguage()).toBe('id');
    });

    test('getAvailableLanguages should return all supported languages', () => {
        const languages = i18n.getAvailableLanguages();
        expect(languages).toContain('id');
        expect(languages).toContain('en');
    });

    test('t() should return translated string', () => {
        i18n.setLanguage('en');
        expect(i18n.t('appName')).toBe('MulyoNode');
        expect(i18n.t('cmd.init.desc')).toContain('Build infrastructure');

        i18n.setLanguage('id');
        expect(i18n.t('cmd.init.desc')).toContain('Membangun IKN');
    });

    test('t() should fallback to ID if key not found in current lang', () => {
        i18n.setLanguage('en');
        expect(i18n.t('missing.key')).toBe('missing.key');
    });

    test('rebrand() should replace negative words', () => {
        i18n.setLanguage('id');
        expect(i18n.rebrand('System Error')).toBe('System Sabotase Asing');

        i18n.setLanguage('en');
        expect(i18n.rebrand('System Error')).toBe('System Challenge');
    });
});
