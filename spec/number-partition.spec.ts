
import { getNumberPartitions } from '../src/number-partition.js';

describe('getNumberPartitions', () =>
{
    describe('(0)', () =>
    {
        it('should be [[0]]', () =>
        {
            expect(getNumberPartitions(0)).toEqual([[0]]);
        });
    });

    describe('(1)', () =>
    {
        it('should be [[1]]', () =>
        {
            expect(getNumberPartitions(1)).toEqual([[1]]);
        });
    });

    describe('(2)', () =>
    {
        it('should be [[2], [1 + 1]]', () =>
        {
            expect(getNumberPartitions(2)).toEqual([[2], [1, 1]]);
        });
    });

    describe('(3)', () =>
    {
        it('should be [[3], [1 + 2], [2 + 1], [1 + 1 + 1]]', () =>
        {
            const expectedPartitions = [[3], [1, 2], [2, 1], [1, 1, 1]];
            expect(getNumberPartitions(3)).toEqual(expectedPartitions);
        });
    });

    describe('(4)', () =>
    {
        it('should be [[4], [3 + 1], [2 + 2], [1 + 3], [2 + 1 + 1], [1 + 2 + 1], [1 + 1 + 2], [1 + 1 + 1 + 1]]', () =>
        {
            console.log(getNumberPartitions(4));
            const expectedPartitions = [[4], [3 + 1], [2 + 2], [1 + 3], [2 + 1 + 1], [1 + 2 + 1], [1 + 1 + 2], [1 + 1 + 1 + 1]];
            expect(getNumberPartitions(4)).toEqual(expectedPartitions);
        });
    });
});

