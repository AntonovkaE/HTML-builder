const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream('text.txt');
let data = ''
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));
