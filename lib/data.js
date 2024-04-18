const fs = require('fs');
const path = require('path');
const lib = {};
lib.basedir = path.join(__dirname, '/../.data/');

lib.createFile = (dir, file, data, callback) => {
    fs.open(`${lib.basedir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if (!err1) {
                    fs.close(fileDescriptor, (err2) => {
                        if (!err2) {
                            callback("File is created");
                        } else {
                            callback('Error closing file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};

module.exports = lib;
