const handlers = require('../../lib/handlers');
const fs = require('fs');
const state = require('../../lib/state');
const dynasty = require('../../lib/dynasty');

jest.mock('fs');
jest.mock('../../lib/state');
jest.mock('../../lib/dynasty');
jest.mock('ora', () => {
    return () => ({
        start: jest.fn().mockReturnThis(),
        succeed: jest.fn().mockReturnThis(),
        fail: jest.fn().mockReturnThis(),
        text: ''
    });
});

async function runTimers() {
    // Run extensively to cover multiple sequential delays
    for (let i = 0; i < 50; i++) {
        jest.advanceTimersByTime(2000); // Advance 2s each step
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

    test('handleInit should create config file', async () => {
        const promise = handlers.handleInit({ force: false });
        await runTimers();
        await promise;

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining('revolusi-mental.config.js'),
            expect.any(String)
        );
    });

    test('handleInit should respect existing config', async () => {
        fs.existsSync.mockReturnValue(true);

        const promise = handlers.handleInit({ force: false });
        await runTimers();
        await promise;

        expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    test('handleStart should call dynasty.jalankanDinasti', async () => {
        const promise = handlers.handleStart('server.js', { gerilya: false });
        await runTimers();
        await promise;
        expect(dynasty.jalankanDinasti).toHaveBeenCalled();
    });

    test('handleStart should exit if script missing', async () => {
        await expect(handlers.handleStart(undefined, {}))
            .rejects.toThrow('Process exited with code 1');
    });

    test('handleAudit should print WTP result', async () => {
        const promise = handlers.handleAudit({});
        await runTimers();
        await promise;

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WTP'));
    });

    test('handleBansos should call simulasiBansos', async () => {
        const promise = handlers.handleBansos({ size: '1GB', target: 'heap' });
        await runTimers();
        await promise;
        expect(dynasty.simulasiBansos).toHaveBeenCalled();
    });

    test('handleSensus should list processes', async () => {
        state.getKoalisi.mockReturnValue([
            { pid: 123, name: 'worker.js', startTime: Date.now() }
        ]);
        const killSpy = jest.spyOn(process, 'kill').mockImplementation(() => true);

        await handlers.handleSensus();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('worker.js'));
        killSpy.mockRestore();
    });

    test('handleLengser should kill process', async () => {
        state.getKoalisi.mockReturnValue([
            { pid: 999, name: 'target.js' }
        ]);
        const killSpy = jest.spyOn(process, 'kill').mockImplementation(() => true);

        const promise = handlers.handleLengser('999');
        await runTimers();
        await promise;

        expect(killSpy).toHaveBeenCalledWith(999, 'SIGTERM');
        killSpy.mockRestore();
    });
});
