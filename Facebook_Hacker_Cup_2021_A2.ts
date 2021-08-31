import fs from 'fs';

type StrMap = Map<string, string[]>
let A = 'A'.charCodeAt(0);
const ALPHABET = Array(26).fill(null).map(() => String.fromCharCode(A++));

const mapStr = new Map<string, string[]>();
const mapPairs = new Map<string, string[]>();

const addNode = (char: string, map: StrMap) => map.set(char, []);

const addFirstDepthLevel = (
  key: string,
  val: string,
  map: StrMap
) => map.get(key)?.push(val);

const bfs = (start: string, target: string) => {
  let depth = 1;
  let neighbors = mapStr.get(start) || [];
  const set = new Set(neighbors);
  
  while (neighbors.length) {
    if (neighbors.includes(target)) {
      return depth;
    } else {
      neighbors = neighbors
        .reduce((a: string[], el) => a.concat(mapPairs.get(el)!), [])
        .filter(el => !set.has(el));

      neighbors.forEach(el => set.add(el));
      ++depth;
    }
  }
};

const computeResponse = (str: string[]) => {
  const sums = ALPHABET.map(alphChar => 
    str.reduce(
      (sum, strChar) => (
        sum + (alphChar === strChar ? 0 : bfs(strChar, alphChar))!
      ),
      0
    ) || 400001
  );
  
  return Math.min(...sums) === 400001 ? -1 : Math.min(...sums);
};

fs.readFile('input.txt', (_, data) => {
  const lines = data.toLocaleString().split('\n');
  const response: string[] = [];
  let birthday = 0;

  for (let i = 0; i < lines.length - 1;) {
    const str = lines[++i].split('');
    let K = +lines[++i];
    const pairs: string[][] = [];
  
    while (K--) pairs.push(lines[++i].split(''));
    
    str.forEach(el => addNode(el, mapStr));
    pairs.forEach(([k]) => addNode(k, mapPairs));

    pairs.forEach(([k, v]) => addFirstDepthLevel(k, v, mapStr));
    pairs.forEach(([k, v]) => addFirstDepthLevel(k, v, mapPairs));

    const neededTime = new Set(str).size === 1 ? 0 : computeResponse(str);
    
    response.push(`Case #${++birthday}: ${neededTime}`);
    mapStr.clear();
    mapStr.clear();
  }

  console.log(response.join('\n'));

  fs.writeFile('ouput.txt', response.join('\n'), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
});
