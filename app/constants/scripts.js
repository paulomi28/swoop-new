const testFolder = '../assets/icons';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(`import ${file.split('.')[0]} from '../assets/icons/${file}'`);
    });
});