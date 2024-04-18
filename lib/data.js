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
lib.readFile=(dir,file,callback)=>{
    fs.readFile(`${lib.basedir}${dir}/${file}.json`,'utf8',(err,data)=>{
        if(!err){
        callback(data);
        }
        else{
        callback(err);
        }
    })
}
lib.updateFile=(dir,file,data,callback)=>{
    fs.open(`${lib.basedir}${dir}/${file}.json`,'r+',(err,FileProperties)=>{
    const stringData=JSON.stringify(data);
    if(!err){
        fs.truncate(FileProperties,(err)=>{
        if(!err){
            fs.writeFile(FileProperties,stringData,(err,data)=>{
                if(!err){
                callback(data)
                }  
                else{
                    callback(err);
                }
                })  
        }
        })
          
    }
    else{

    }
    })
   
}
lib.deleteFile = (dir, file, callback) => {
    const filePath = `${lib.basedir}${dir}/${file}.json`;

    fs.unlink(filePath, (err) => {
        if (err) {
            callback('File is not found');
        } else {
            callback(null, 'File is deleted');
        }
    });
};

module.exports = lib;
