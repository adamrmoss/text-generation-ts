
import { getClampedNumberPartitions, getNumberPartitions, getStringPartitions } from '../src/number-partition.js';

describe('getNumberPartitions', () =>
{
    describe('(0)', () =>
    {
        it('should be []', () =>
        {
            expect(getNumberPartitions(0)).toEqual([]);
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
        it('should be [[3], [2 + 1], [1 + 2], [1 + 1 + 1]]', () =>
        {
            const expectedPartitions = [[3], [2, 1], [1, 2], [1, 1, 1]];
            expect(getNumberPartitions(3)).toEqual(expectedPartitions);
        });
    });

    describe('(4)', () =>
    {
        it('should be [[4], [3 + 1], [2 + 2], [2 + 1 + 1], [1 + 3], [1 + 2 + 1], [1 + 1 + 2], [1 + 1 + 1 + 1]]', () =>
        {
            const expectedPartitions = [[4], [3, 1], [2, 2], [2, 1, 1], [1, 3], [1, 2, 1], [1, 1, 2], [1, 1, 1, 1]];
            expect(getNumberPartitions(4)).toEqual(expectedPartitions);
        });
    });

    describe('(5)', () =>
    {
        it(`should be [
            [5], [4 + 1], [3 + 2], [3 + 1 + 1], [2 + 3], [2 + 2 + 1], [2 + 1 + 2], [2 + 1 + 1 + 1], [1 + 4],
            [1 + 3 + 1], [1 + 2 + 2], [1 + 2 + 1 + 1], [1 + 1 + 3], [1 + 1 + 2 + 1], [1 + 1 + 1 + 2], [1 + 1 + 1 + 1 + 1]
        ]`, () =>
        {
            const expectedPartitions =
            [
                [5], [4, 1], [3, 2], [3, 1, 1], [2, 3], [2, 2, 1], [2, 1, 2], [2, 1, 1, 1], [1, 4],
                [1, 3, 1], [1, 2, 2], [1, 2, 1, 1], [1, 1, 3], [1, 1, 2, 1], [1, 1, 1, 2], [1, 1, 1, 1, 1]
            ];
            expect(getNumberPartitions(5)).toEqual(expectedPartitions);
        });
    });

    describe('(12)', () =>
    {
        it('should be possible', () =>
        {
            getNumberPartitions(12);
        });
    });

    describe('(20)', () =>
    {
        it('should be possible', () =>
        {
            getNumberPartitions(20);
        });
    });

    describe('(21)', () =>
    {
        it('should throw an error', () =>
        {
            const shouldThrow = () => getNumberPartitions(21);

            expect(shouldThrow).toThrowError();
        });
    });
});

describe('getClampedNumberPartitions', () =>
{
    describe('(8, 2, 3)', () =>
    {
        it('should be [[3 + 3 + 2], [3 + 2 + 3], [2 + 3 + 3], [2 + 2 + 2 + 2]]', () =>
        {
            const expectedPartitions = [
                [ 3, 3, 2 ], [ 3, 2, 3 ], [ 2, 3, 3 ], [ 2, 2, 2, 2 ]
            ];
            expect(getClampedNumberPartitions(8, 2, 3)).toEqual(expectedPartitions);
        });
    });

    describe('(5, 3, 4)', () =>
    {
        it('should be []', () =>
        {
            expect(getClampedNumberPartitions(5, 3, 4)).toEqual([]);
        });
    });
});

describe('getStringPartitions', () =>
{
    describe(`('Hampshire', 3, 4)`, () =>
    {
        it('should be []', () =>
        {
            const expectedSubstrings =
            [
                ['Ham', 'psh', 'ire']
            ];
            expect(getStringPartitions('Hampshire', 3, 4)).toEqual(expectedSubstrings);
        });
    });
});
