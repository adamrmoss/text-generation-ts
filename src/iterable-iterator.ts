function sumArray(array: number[]): number
{
    return array.reduce((prev, curr) => prev + curr, 0);
}

function sumIterator(iterator: IterableIterator<number>): number
{
    return sumArray([...iterator]);
}

export
{
    sumArray,
    sumIterator,
};
