import { jsonEquals } from './json-equals.js';
import { SetWithEquality } from './set-with-equality.js';

type NumberPartition = number[];

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
    partitions.add([n]);
    for (let i = 1; i < n; i++)
    {
        getNumberPartitions(n - i)
            .flatMap(partition => [[i, ...partition], [...partition, i]])
            .forEach(partition => partitions.add(partition));
    }

    return [...partitions];
}

export
{
    getClampedNumberPartitions,
    getNumberPartitions,
};
