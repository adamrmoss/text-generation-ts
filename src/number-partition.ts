import { jsonEquals } from './json-equals.js';
import { SetWithEquality } from './set-with-equality.js';

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

    const partitions = new SetWithEquality<NumberPartition>(jsonEquals);
    for (let i = 1; i < n; i++)
    {
        const previousPartitions = getNumberPartitions(n - i);
        const newPartitions: NumberPartition[] = [[n], ...previousPartitions.flatMap(partition => [[i, ...partition], [...partition, i]])];

        newPartitions.forEach(partition => partitions.add(partition));
    }

    return [...partitions];
}

export
{
    getNumberPartitions,
};
