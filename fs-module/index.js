// async function test(){
// console.log('hiiii');

//     return('shiv')
// }
// const r=test()
// // console.log("", r.then);
// r.then((res)=>{
//     console.log("res", res);
    
// })

// console.log("byy");
const fs = require('fs');
const zlib = require('zlib');
const dicomParser = require('dicom-parser');
const path = require('path');

// Replace with your file path
const gzFilePath = './test.dcm.gz';

// Read and decompress the .gz file
fs.readFile(gzFilePath, (err, compressedData) => {
  if (err) {
    return console.error('Error reading .gz file:', err);
  }

  zlib.gunzip(compressedData, (err, decompressedData) => {
    if (err) {
      return console.error('Error decompressing .gz file:', err);
    }

    try {
      const dataSet = dicomParser.parseDicom(decompressedData);

      // Example: Read Patient Name
      const patientName = dataSet.string('x00100010');
      console.log('Patient Name:', patientName);

      // You can read other tags similarly
    } catch (parseErr) {
      console.error('Error parsing DICOM data:', parseErr);
    }
  });
});

