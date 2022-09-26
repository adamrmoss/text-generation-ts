
type NumberPartition = number[];

function getNumberPartitions(n: number): NumberPartition[]
{
    n = Math.floor(n);

    if (n === 0)
    {
        return [[0]];
    }

    if (n === 1)
    {
        return [[1]];
    }

    const previousPartitions = getNumberPartitions(n - 1);

    return [];
}

export
{
    getNumberPartitions,
};
