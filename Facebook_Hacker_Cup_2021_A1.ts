// my solution

import fs from 'fs';

const VOC = ['A', 'E', 'I', 'O', 'U'];

interface A { cons: { [x: string]: string }, voc: { [x: string]: string } };

fs.readFile('input.txt', (_, data) => {
  const lines = data.toLocaleString().split('\n')

  const res = lines.slice(1).map((s, i) => {
    const alph = s.split('').reduce(
      (ac, curr) => VOC.includes(curr)
        ? typeof ac.voc[curr] === 'string'
          ? {...ac, voc: {...ac.voc, [curr]: ac.voc[curr] + curr}}
          : {...ac, voc: {...ac.voc, [curr]: curr}}
        : typeof ac.cons[curr] === 'string'
          ? {...ac, cons: {...ac.cons, [curr]: ac.cons[curr] + curr}}
          : {...ac, cons: {...ac.cons, [curr]: curr}},
      { cons: {}, voc: {} } as A
    );
    
    const voc = Object.values(alph.voc).sort((a, b) => b.length - a.length);
    const cons = Object.values(alph.cons).sort((a, b) => b.length - a.length);
    const totV = voc.reduce((ac, curr) => ac + curr.length, 0);
    const totC = cons.reduce((ac, curr) => ac + curr.length, 0);
    const maxV = (totV - (voc[0]?.length || 0)) * 2 + totC;
    const maxC = (totC - (cons[0]?.length || 0)) * 2 + totV;

    return `Case #${i + 1}: ${Math.min(maxC, maxV)}`;
  });

  console.log(res.join('\n'));

  fs.writeFile('ouput.txt', res.join('\n'), (err) => {
    if (err) throw err;
    console.log('Complete!');
  });
});

// oficial (better) solution

import fs from 'fs';

let A = 'A'.charCodeAt(0)
const ALPHABET = Array(26).fill(null).map(() => String.fromCharCode(A++));
const VOWEL = ['A', 'E', 'I', 'O', 'U'];

const isVowel = (char: string) => VOWEL.includes(char);
const isSameType = (char1: string, char2: string) => 
  isVowel(char1) && isVowel(char2) || !isVowel(char1) && !isVowel(char2)

fs.readFile('input.txt', (_, data) => {
  const lines = data.toLocaleString().split('\n');
  const res = lines.slice(1).map((str, i) => {
    const costs = ALPHABET.map(char => str.split('').reduce(
      (a, curr) => char === curr ? a : a + (isSameType(char, curr)  ? 2 : 1), 0
    ));

    return `Case #${i + 1}: ${Math.min(...costs)}`;
  });

  console.log(res.join('\n'));

  fs.writeFile('ouput.txt', res.join('\n'), (err) => {
    if (err) throw err;
    console.log('Complete!');
  });
});
