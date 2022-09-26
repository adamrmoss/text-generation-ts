type NumberPartition = number[];
type StringPartition = string[];

const maximalSize = 20;

function getClampedNumberPartitions(n: number, min: number, max: number)
    : NumberPartition[]
{
    const allNumberPartitions = getNumberPartitions(n);
    const clampedNumberPartitions = allNumberPartitions.filter(
        partition => partition.every(value => min <= value && value <= max)
    );
    return clampedNumberPartitions;
}

function getNumberPartitions(n: number): NumberPartition[]
{
    n = Math.trunc(n);

    if (n > maximalSize)
    {
        throw new Error(`getNumberPartitions(${n}) exceeds maximal size of n=${maximalSize}`);
    }

    if (n <= 0)
    {
        return [];
    }

    const partitions = [[n]]
    for (let i = 1; i < n; i++)
    {
        const firstPartite = n - i;
        const remainderPartitions = getNumberPartitions(i);
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
    maximalSize,
};
