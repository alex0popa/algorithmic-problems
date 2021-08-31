import fs from 'fs';

const cavesMap = new Map<number, number[]>();

const addNode = (cave: number) => cavesMap.set(cave + 1, []);

const addEdges = (key: number, val: number) => cavesMap.get(key)?.push(val);

const dfs = (start: number, weights: number[]) => {
  const visited = new Set<number>([1, start]);
  const sums: number[] = [];
  let sum = 0;
  const stack = [start];
  const costs = [sum];

  while (stack.length) {
    const currVertex = stack.pop();
    sum += weights[currVertex! - 1]
    const neighbors = cavesMap
      .get(currVertex!)!
      .filter(neighbor => !Array.from(visited).includes(neighbor));

    neighbors.length === 0 &&
      sums.push(sum) &&
      stack.length > 0 &&
      (sum = costs.pop()!);

    for (let y = 1; y < neighbors.length!; ++y) costs.push(sum);

    neighbors.forEach(n => !visited.has(n) && visited.add(n) && stack.push(n));
  }
  
  return Math.max(...sums);
};

fs.readFile('input.txt', (_, data) => {
  const lines = data.toLocaleString().split('\n');
  const res: string[] = [];
  let mines = 0;

  for (let i = 0; i < lines.length - 1;) {
    const edges: number[][] = [];
    let N = +lines[++i]
    const weights = lines[++i].split(' ').map(el => +el);

    for (--N; 0 < N; --N) edges.push(lines[++i].split(' ').map(el => +el));

    weights.forEach((_, ind) => addNode(ind));
    edges.forEach(([A, B]) => addEdges(A, B) && addEdges(B, A));

    const posibleWeights = [0]
      .concat(cavesMap.get(1)!.map(el => dfs(el, weights)))
      .sort((a, b) => b - a);

    const maxWeight = weights[0] + posibleWeights[0] + (posibleWeights[1] || 0);

    res.push(`Case #${++mines}: ${maxWeight}`);
  }

  console.log(res.join('\n'));

  fs.writeFile('ouput.txt', res.join('\n'), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});
