// lvl-1
/**
 * You are given an input ﬁle that contains program code that is written in a new
 * programming language. In this programming language, the code is a stream of
 * tokens separated by some white spaces (line breaks or spaces). A token is a
 * concatenation of characters that are not separated by white spaces or new lines.
 * Code statements are written in blocks called functions. Those function blocks start
 * with the token start and end with the token end. Each function contains zero or
 * more code statements. If we refer to a valid code statement as <statement> then
 * code statements can be any of the following stream of tokens.
 * 
 * ● print <Boolean | Integer | String>, this statement prints its value to the screen
 *   without extra spaces before or after, which means that the output multiple print
 *   statements will always appear concatenated on the screen
 * 
 * Where:
 * Boolean means the token true or the token false
 * Integer means a token that represents a non negative integer
 * String means a token that is not a preserved token or Integer or Boolean
 * Preserved tokens up till now are:
 * start, end, print
 * More preserved tokens will be added in future levels.
 * 
 * Given a code as described above, output what will be printed on the screen after
 * executing its only function.
 * 
 * Format: N - lineOfCode (repeated N times)
 * Types: N (int) number of code lines that follow lineOfCode (string) one or more space separated tokens
 * 
 * Example:
 * 
 * Input:
 * 6
 * start
 * print is
 * print this
 * print the
 * print matrix
 * end
 * 
 * Output: isthisthematrix
 * 
 * For easier readability, every statement is shown in one line in the
 * example. This will not be the case in the real input ﬁles.
 */

// solution lvl1
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
/**
 * The following new statements will be added:
 * ● return <Boolean | Integer | String>, this statement once reached, will terminate
 * the execution of its function and return its value to the caller function if any (will
 * be relevant for later levels). Any other statements after reaching this statement
 * should be ignored
 * ● if <Boolean> <statement>* end else <statement>* end, this statement works
 * very similar to how it works in other languages. In case of true Boolean value the
 * ﬁrst set of statements get executed otherwise the set of statements in the else
 * part get executed
 * 
 * Where <statement>* means zero or more code statements
 * 
 * ● In this level if / else statements cannot contain other if / else statements
 * 
 * Considering these changes execute the function like in the previous level.
 * 
 * The input and output format is identical to last level.
 * 
 * Example:
 * 
 * Input:
 * 
 * 15
 * start
 * print hello
 * if true
 * print world
 * end
 * else
 * print something
 * end
 * print good
 * print night
 * return true
 * print notprinted
 * end
 * 
 * Output: helloworldgoodnight
 */

// solution lvl2
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
