const isMagic = (a: number[]) =>
    a[0] + a[1] + a[2] === 15 &&
    a[3] + a[4] + a[5] === 15 &&
    a[0] + a[3] + a[6] === 15 &&
    a[1] + a[4] + a[7] === 15 &&
    a[0] + a[4] + a[8] === 15 &&
    a[2] + a[4] + a[6] === 15


const heapPermutation = (square: number[], size: number, magicSquares: number[][]) => {
    if (size === 1) {
        isMagic(square) && magicSquares.push([...square])
        return
    }

    for (let i = 0; i < size; i++) {
		heapPermutation(square, size - 1, magicSquares)

        size % 2 === 1
            // if size is odd, swap 0th i.e (first) and (size-1)th i.e (last) element
            ? [square[0], square[size - 1]] =  [square[size - 1], square[0]]
            // If size is even, swap ith and (size-1)th i.e (last) element
            : [square[i], square[size - 1]] =  [square[size - 1], square[i]]
	}

    return magicSquares
}

const magicSquaresPermutations = (n: number) => {
    const arr = []
    for (let i = 0; i < n; ++i) {
        arr.push(i + 1)
    }
    return heapPermutation(arr, n, [])
}

const costBetween = (magicSquare: number[], square: number[]) =>
    magicSquare.reduce((cost, magicEl, i) => cost + Math.abs(magicEl - square[i]), 0)

function formingMagicSquare(s: number[][]) {
    const squareS = s.reduce((a: number[], c: number[]) => a.concat(c))
    // a square filled with nines
    const MAX_SQARE_TEST = 9 * 9
    // 3 rows with sum of elements 15
    const SUM_MAGIC_SQUARE = 3 * 15
    // maximum possible cost
    const MAX_COST = MAX_SQARE_TEST - SUM_MAGIC_SQUARE
    // all possible magic squares of 3x3 matrix
    const magicSquares = magicSquaresPermutations(squareS.length)
    // compare all the magic squares with the received square to find the minimum cost
    return magicSquares.reduce(
        (cost, magicSquare) => Math.min(cost, costBetween(magicSquare, squareS)),
        MAX_COST
    )
}

const T1 = [
    [4, 8, 2],
    [4, 5, 7],
    [6, 1, 6]
]

const T2 = [
    [4, 9, 6],
    [4, 9, 6],
    [4, 9, 6]
]

console.log(formingMagicSquare(T1))
