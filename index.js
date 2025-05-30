const fs = require('fs');
const zlib = require('zlib');

// Path to your compressed DCM file
const gzFilePath = './test.dcm.gz';

// Step 1: Read and unzip
fs.readFile(gzFilePath, (err, compressedData) => {
  if (err) return console.error('Read error:', err);

  zlib.gunzip(compressedData, (err, decompressedData) => {
    if (err) return console.error('Gunzip error:', err);

    const text = decompressedData.toString('utf-8');
    console.log('text**********\n', text)

    // Step 2: Parse FESTWERT blocks
    const festwertRegex = /FESTWERT\s+(.+?)\s+LANGNAME\s+"(.+?)"\s+WERT\s+([\d.+-eE]+)\s+EINHEIT_W\s+"(.*?)"\s+END/gs;

    console.log("festwertRegex", festwertRegex);
    
    const parameters = [];
    let match;
    while ((match = festwertRegex.exec(text)) !== null) {
      console.log("match", match);
      
      parameters.push({
        name: match[1],
        description: match[2],
        value: parseFloat(match[3]),
        unit: match[4]
      });
    }

    console.log('Extracted Parameters:', parameters);
  });
});
