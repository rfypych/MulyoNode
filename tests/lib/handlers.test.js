const handlers = require('../../lib/handlers');
const fs = require('fs');
const state = require('../../lib/state');
const processManager = require('../../lib/process-manager');
const configLoader = require('../../lib/config');

jest.mock('fs');
jest.mock('../../lib/state');
jest.mock('../../lib/process-manager');
jest.mock('../../lib/config');
jest.mock('ora', () => {
    return () => ({
        start: jest.fn().mockReturnThis(),
        succeed: jest.fn().mockReturnThis(),
        fail: jest.fn().mockReturnThis(),
        text: ''
    });
});

async function runTimers() {
    for (let i = 0; i < 50; i++) {
        jest.advanceTimersByTime(2000);
        await Promise.resolve();
    }
}

describe('CLI Handlers', () => {
    let logSpy;
    let exitSpy;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        exitSpy = jest.spyOn(process, 'exit').mockImplementation((code) => {
            if (code !== 0) throw new Error(`Process exited with code ${code}`);
        });

        fs.existsSync.mockReturnValue(false);
        fs.writeFileSync.mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
        exitSpy.mockRestore();
        jest.clearAllMocks();
    });

    test('handleInit should create config via configLoader', async () => {
        const promise = handlers.handleInit({ force: false });
        await runTimers();
        await promise;

        expect(configLoader.createDefault).toHaveBeenCalled();
    });

    test('handleStart should call processManager.start', async () => {
        const promise = handlers.handleStart('server.js', { gerilya: false });
        await runTimers();
        await promise;
        expect(processManager.start).toHaveBeenCalled();
    });

    test('handleBansos should call processManager.simulasiBansos', async () => {
        const promise = handlers.handleBansos({ size: '1GB', target: 'heap' });
        await runTimers();
        await promise;
        expect(processManager.simulasiBansos).toHaveBeenCalled();
    });
});
