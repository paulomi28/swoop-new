const testFolder = './assets/light';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        console.log(`import ${file.split('.')[0]}_light from '../assets/icons/light/${file}'`);
    });
});