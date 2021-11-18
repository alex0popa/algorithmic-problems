// lvl-1
import fs from 'fs';

fs.readdir('/home/alex/Desktop/level1', (_, files) => {
  files.forEach(fileName => {
    const res = fs
      .readFileSync(`/home/alex/Desktop/level1/${fileName}`)
      .toLocaleString()
      .split('print')
      .splice(1)
      .map(str => str.trim())
      .join('')
      .split(' end')[0];

    const outpoutFileName = fileName.split('.')[0] + '.out';
    fs.writeFile(outpoutFileName, res, _=> {});
  });
});

// lvl-2
import fs from 'fs';

const computeResponse = (data: string[]) => {
  let res = '', ok = true;

  for (let i = 0; i < data.length && ok; ++i) {
    const statement = data[i];

    if (statement === 'return') break;

    if (statement === 'if') {
      if (data[++i] === 'false') {
        i += data.slice(i).findIndex(val => val === 'else');
      }

      while(data[++i] !== 'end' && ok) {
        if (data[i] === 'return') ok = false;
        if (data[i] === 'print') res += data[++i];
      }

      if (data[i + 1] === 'else' && ok) {
        i += data.slice(i).findIndex(val => val === 'end');
      }
    } else if (statement === 'print') {
      res += data[++i];
    }
  }

  return res;
}

fs.readdir('/home/alex/Desktop/level2', (_, files) => {
  files.forEach(fileName => {
    const data = fs
      .readFileSync(`/home/alex/Desktop/level2/${fileName}`)
      .toLocaleString()
      .split('\n')
      .map(line => line.split('\r')[0])
      .join(' ')
      .split(' ')
      .slice(2);

    const res = computeResponse(data);
    const outpoutFileName = fileName.replace('in', 'out');

    fs.writeFile(outpoutFileName, res, _=> {});
  });
});
