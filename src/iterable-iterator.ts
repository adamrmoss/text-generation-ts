function sumIterator(iterator: IterableIterator<number>): number
{
    return [...iterator]
        .reduce((prev, curr) => prev + curr, 0);
}

export
{
    sumIterator,
};
