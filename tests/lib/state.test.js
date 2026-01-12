const fs = require('fs');
const path = require('path');
const os = require('os');

// Factory mock for os to handle top-level call
jest.mock('os', () => ({
    homedir: jest.fn(() => '/mock/home'),
    // Add other os methods if needed, but only homedir is used
}));

jest.mock('fs');

// Require module under test normally
const state = require('../../lib/state');

describe('State Module', () => {
    const mockHomeDir = '/mock/home';
    const mockMulyoDir = path.join(mockHomeDir, '.mulyo');
    const mockDbPath = path.join(mockMulyoDir, 'ordal.json');

    beforeEach(() => {
        jest.clearAllMocks();

        fs.mkdirSync.mockImplementation(() => {});
        fs.writeFileSync.mockImplementation(() => {});
        fs.existsSync.mockReturnValue(false);
        fs.readFileSync.mockImplementation(() => {
            throw new Error('Unexpected readFileSync call');
        });
    });

    test('getKoalisi should return parsed JSON', () => {
        const mockData = [{ pid: 123, name: 'test' }];

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

        const result = state.getKoalisi();
        expect(result).toEqual(mockData);
    });

    test('recruitMember should add to DB', () => {
        const existing = [{ pid: 1 }];

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(existing));

        state.recruitMember({ pid: 2, name: 'new-member' });

        const writeCall = fs.writeFileSync.mock.calls[fs.writeFileSync.mock.calls.length - 1];
        expect(writeCall[1]).toContain('"pid": 2');
    });

    test('kickMember should remove from DB', () => {
        const existing = [{ pid: 1 }, { pid: 2 }];

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(existing));

        state.kickMember(1);

        const calls = fs.writeFileSync.mock.calls;
        const lastCall = calls[calls.length - 1];
        const writtenData = JSON.parse(lastCall[1]);

        expect(writtenData).toHaveLength(1);
        expect(writtenData[0].pid).toBe(2);
    });

    test('updateMember should modify existing record', () => {
        const existing = [{ pid: 1, status: 'OLD' }];

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(existing));

        state.updateMember(1, { status: 'NEW' });

        const calls = fs.writeFileSync.mock.calls;
        const lastCall = calls[calls.length - 1];
        const writtenData = JSON.parse(lastCall[1]);

        expect(writtenData[0].status).toBe('NEW');
    });

    test('getLogPaths should return valid paths', () => {
        const paths = state.getLogPaths('My Script.js');
        expect(paths.out).toContain('my_script_js.out.log');
    });
});
