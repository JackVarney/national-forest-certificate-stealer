const { promisify } = require('util');
const { mkdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const request = promisify(require('request'));

const folderPath = join(__dirname, 'pdfs');

(async () => {
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  for (let i = 0; i < 5000; i += 1) {
    const { body } = await request({
      uri: `https://www.nationalforest.org/generate_certificate/${i}`,
      encoding: null,
      headers: {
        'Content-type': 'applcation/pdf'
      }
    });

    var l = body.toString().length;

    if (l !== 68 && l !== 31461 && l !== 31460 && l !== 31459 && l !== 31458) {
      writeFileSync(join(folderPath, `certificate-${i}.pdf`), body, 'binary');

      console.log(`Wrote certificate No. ${i}`);
    } else {
      console.log(`Certificate No. ${i} does not exist`);
    }
  }
})();
