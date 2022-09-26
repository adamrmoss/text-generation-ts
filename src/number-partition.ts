import memoize from 'memoizee';

type NumberPartition = number[];
type StringPartition = string[];

function getClampedNumberPartitions(n: number, min: number, max: number)
    : NumberPartition[]
{
    const allNumberPartitions = getNumberPartitions(n);
    const clampedNumberPartitions = allNumberPartitions.filter(
        partition => partition.every(value => min <= value && value <= max)
    );
    return clampedNumberPartitions;
}

const memoizedGetNumberPartitions = memoize(getNumberPartitions);

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

    const partitions = [[n]]
    for (let i = 1; i < n; i++)
    {
        const firstPartite = n - i;
        const remainderPartitions = memoizedGetNumberPartitions(i);
        remainderPartitions.forEach(partition => partitions.push([firstPartite, ...partition]));
    }

    return partitions;
}

function getStringPartitions(text: string, min: number, max: number): StringPartition[]
{
    const numberPartitions = getClampedNumberPartitions(text.length, min, max);

    return numberPartitions.map(partition => {
        const partitionedString: string[] = [];

        let substringStart = 0;
        for (let i = 0; i < partition.length; i++)
        {
            const substringLength = partition[i];
            partitionedString.push(text.substring(substringStart, substringStart + substringLength));

            substringStart += substringLength;
        }

        return partitionedString;
    });
}

export
{
    getClampedNumberPartitions,
    getNumberPartitions,
    getStringPartitions,
};
