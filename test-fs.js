try {
    require('fs').writeFileSync('test-fs.txt', 'hello world from node');
    console.log('Success verify');
} catch (e) {
    console.error(e);
}
