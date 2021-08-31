import fs from 'fs';

const winMoves = (str: string) => str.split('').reduce(
  (a, c) => c === '.' ? a + 1 : a,
  0
);

fs.readFile('input.txt', (_, data) => {
  const lines = data.toLocaleString().split('\n');
  const res: string[] = [];
  let games = 0;

  for (let i = 0; i < lines.length - 1;) {
    const grid: string[] = [];
    
    for (let N = +lines[++i]; 0 < N; --N) grid.push(lines[++i]);

    const rawColumns = Array(grid.length).fill(null).map(
      (_, index) => grid.map(row => row[index]).join('')
    );
    const columns = rawColumns.filter(column => !column.includes('O'));
    const rows = grid.filter(row => !row.includes('O'));
    const posibilities = [...rows, ...columns].sort(
      (a, b) => winMoves(a) - winMoves(b)
    );

    const isComun = (casesMinimum: string[]) => {
      const rowsMin = rows.filter(row => casesMinimum.includes(row));
      const posRows = grid.reduce(
        (ar, r, index) => rowsMin.includes(r) ? ar.concat([index]) : ar,
        [] as number[]
      );
      const colsMin = rawColumns.filter(c => casesMinimum.includes(c));
      const posCols = rawColumns.reduce(
        (ar, c, index) => colsMin.includes(c) ? ar.concat([index]) : ar,
        [] as number[]
      );

      return rowsMin.reduce(
        (count, row, currIndxRow) =>
          colsMin.reduce(
            (isMatch, col, currIndxCol) =>
              !isMatch &&
              row.search(/[.]/) === posCols[currIndxCol] &&
              col.search(/[.]/) === posRows[currIndxRow]
                ? !isMatch
                : isMatch,
            false
          )
            ? count + 1
            : count,
        0
      );
    };

    const computeResp = () => {
      const minMoves = winMoves(posibilities[0]);
      const  casesMinimum = posibilities.filter(
        pos => winMoves(pos) === minMoves
      );
      let cases =  casesMinimum.length ;

      minMoves === 1 && (cases -= isComun(casesMinimum));

      return `${minMoves} ${cases}`;
    };

    const moves = posibilities[0]?.length ? computeResp() : 'Impossible';
  
    res.push(`Case #${++games}: ${moves}`);
  }

  console.log(res.join('\n'));

  fs.writeFile('ouput.txt', res.join('\n'), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
});
