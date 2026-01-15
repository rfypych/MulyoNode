const handlers = require('../../lib/handlers');
const path = require('path');
const logger = require('../../lib/logger');

// Mock logger to avoid clutter
jest.spyOn(logger, 'info').mockImplementation(() => {});
jest.spyOn(logger, 'warn').mockImplementation(() => {});
jest.spyOn(logger, 'error').mockImplementation(() => {});
jest.spyOn(logger, 'success').mockImplementation(() => {});
jest.spyOn(logger, 'box').mockImplementation(() => {});
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('CLI Commands Integration', () => {

    // Set timeout to 20 seconds for this suite
    jest.setTimeout(20000);

    test('init command should create config', async () => {
        const configPath = path.join(process.cwd(), 'revolusi-mental.config.js');
        // We assume config might exist from other tests, so we use --force logic test
        // Or we assume environment is clean. In sandbox, it might exist.

        await handlers.handleInit({ force: true });

        // We verify via logger calls usually, or check file existence
        // Since we are mocking logger, we check if file exists
        const fs = require('fs');
        expect(fs.existsSync(configPath)).toBe(true);
    });

    test('audit command should run without error', async () => {
        await expect(handlers.handleAudit({})).resolves.not.toThrow();
    });

    test('bansos command should run without error', async () => {
        await expect(handlers.handleBansos({ size: '10MB', target: 'heap' })).resolves.not.toThrow();
    });
});
