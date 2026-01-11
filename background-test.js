let counter = 0;
console.log("Worker started...");
setInterval(() => {
    console.log(`Worker working hard... count: ${counter++}`);
}, 1000);
