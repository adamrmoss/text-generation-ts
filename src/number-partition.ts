import memoize from 'memoizee';

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

export
{
    getClampedNumberPartitions,
    getNumberPartitions,
};
