type Memo = { [key: number]: number }

const fibo = (n: number, memo: Memo = {}) => {
  if (n in memo) {
    const x = memo[n];
    
    delete memo[n];

    return x;
  };

  if (n <= 2) return 1;
  
  memo[n] = fibo(n - 1, memo) + fibo( n - 2, memo)
  
  return memo[n];
};

console.log(fibo(7))
console.log(fibo(8));
console.log(fibo(50));
