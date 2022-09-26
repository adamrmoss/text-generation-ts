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

    const previousPartitions = getNumberPartitions(n - 1);
    const newPartitions: NumberPartition[] = [[n], ...previousPartitions.flatMap(partition => [[1, ...partition], [...partition, 1]])];

    const partitions = new SetWithEquality<NumberPartition>(jsonEquals);
    newPartitions.forEach(partition => partitions.add(partition));

    return [...partitions];
}

export
{
    getNumberPartitions,
};
