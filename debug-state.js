const fs = require('fs');
const state = require('./lib/state');
const os = require('os');
const path = require('path');

const log = [];
log.push('Homedir: ' + os.homedir());
log.push('Ordal Path: ' + path.join(os.homedir(), '.mulyo', 'ordal.json'));

try {
    state.recruitMember({ pid: 123, name: 'debug', mode: 'manual' });
    log.push('Recruit Success');
    const koalisi = state.getKoalisi();
    log.push('Koalisi: ' + JSON.stringify(koalisi, null, 2));
} catch (e) {
    log.push('Error: ' + e.message);
}

fs.writeFileSync('debug-internal.txt', log.join('\n'));
