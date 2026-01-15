console.log('Crashy script started');
setTimeout(() => {
  console.log('Crashy script crashing...');
  process.exit(1);
}, 500);
