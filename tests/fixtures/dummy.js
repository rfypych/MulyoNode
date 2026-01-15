console.log('Dummy script started');
setInterval(() => {
    // Keep alive
}, 1000);

// Handle SIGTERM gracefully as per requirements
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, cleaning up...');
    setTimeout(() => {
        console.log('Cleanup done, exiting.');
        process.exit(0);
    }, 500);
});
