type Memo = { [key: number]: number }

const fiboM = (n: number, memo: Memo = {}) => {
  if (n in memo) {
    const x = memo[n];
    
    delete memo[n];

    return x;
  };

  if (n <= 2) return 1;
  
  memo[n] = fiboM(n - 1, memo) + fiboM( n - 2, memo)
  
  return memo[n];
};

console.log(fiboM(8));
console.log(fiboM(50));


const fiboL = (n: number) => {
  let a = 0, b = 1;

  while (--n) [a, b] = [b, a + b];

  return b;
};

console.log(fiboL(50));
