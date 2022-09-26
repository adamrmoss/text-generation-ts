import memoize from 'memoizee';

import { sumArray } from './iterable-iterator.js';

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

function partitionString(partition: NumberPartition, text: string): string[]
{
    const partitionedString: string[] = [];

    const partitionTotal = sumArray(partition);
    if (partitionTotal !== text.length)
    {
        throw 'Partition is different length than text';
    }

    let substringStart = 0;
    for (let i = 0; i < partition.length; i++)
    {
        const substringLength = partition[i];
        partitionedString.push(text.substring(substringStart, substringStart + substringLength));

        substringStart += substringLength;
    }

    return partitionedString;
}

export
{
    getClampedNumberPartitions,
    getNumberPartitions,
    partitionString,
};
