const fs = require('fs');
const path = require('path');

const config = require('config');

const DAO = require('../dao');


function streamFile(result, outputPath) {
   const streamResult = result.toString();
   const writeStream = fs.createWriteStram(outputPath);

   writeStream.write(streamResult);
   writeStream.end(() => console.log(streamResult));

   writeStream
       .on('error', () => {
           console.error('STREAM ERROR');
           process.exit(1);

       })
       .on('finish', () => {
           const  appDir = path.dirname(require.main.filename);
           const filePath = `${appDir.slice(0, -3)}${outputPath.slice(2).replace('/',"\\")}`;
           console.log('File successfuly exported at : ',  filePath);

           process.exit(0)
       });

}

function exportDB(fileName) {
    if(!fileName)
        return console.error('file_name argument is required');
    DAO.find()
        .then(result =>{
            const dir = config.export.folderName;
            const name = fileName.split('=')[1];
            const outputPath =`${dir}/${name}`;

            if(!fs.existsSync(dir))
                fs.mkdirSync(dir);
            streamFile(result, outputPath);
        })
        .catch(err =>console.error(err));
}

module.exports = exportDB;