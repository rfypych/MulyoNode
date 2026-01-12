const child_process = require('child_process');
const fs = require('fs');

// Hoist mocks
jest.mock('child_process');
jest.mock('fs');
jest.mock('ora', () => {
    return () => ({
        start: jest.fn().mockReturnThis(),
        succeed: jest.fn().mockReturnThis(),
        fail: jest.fn().mockReturnThis(),
        text: ''
    });
});

const dynasty = require('../../lib/dynasty');

describe('Dynasty Module', () => {
    let mockChild;

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup mock child process
        mockChild = {
            pid: 12345,
            stdout: { on: jest.fn() },
            stderr: { on: jest.fn() },
            on: jest.fn(), // for exit handler
            unref: jest.fn(),
            kill: jest.fn(),
        };

        child_process.fork.mockReturnValue(mockChild);
        child_process.spawn.mockReturnValue(mockChild);

        fs.existsSync.mockReturnValue(true);
    });

    test('jalankanDinasti should fork for JS files', async () => {
        await dynasty.jalankanDinasti('app.js', { isAnakEmas: true });

        expect(child_process.fork).toHaveBeenCalledWith(
            expect.stringContaining('app.js'),
            expect.any(Array),
            expect.any(Object)
        );
        expect(child_process.spawn).not.toHaveBeenCalled();
    });

    test('jalankanDinasti should spawn for non-JS files', async () => {
        await dynasty.jalankanDinasti('script.sh', { isAnakEmas: true });

        expect(child_process.spawn).toHaveBeenCalledWith(
            'node',
            [expect.stringContaining('script.sh')],
            expect.any(Object)
        );
        expect(child_process.fork).not.toHaveBeenCalled();
    });

    test('simulasiBansos should calculate evaporation', () => {
        const result = dynasty.simulasiBansos('100MB', 'heap');
        expect(result.penguapan).toBeGreaterThan(0);
        expect(result.sampaiTujuan).toBeLessThan(result.totalAlokasi);
    });

    test('getStatistik should return internal stats', () => {
        const stats = dynasty.getStatistik();
        expect(stats).toHaveProperty('jumlahBlusukan');
        expect(stats).toHaveProperty('anggaranBocor');
    });
});
