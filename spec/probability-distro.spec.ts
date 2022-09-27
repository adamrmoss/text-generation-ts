import { Chance } from 'chance';

import { ProbabilityDistro } from '../src/probability-distro.js';

describe('ProbabilityDistro', () =>
{
    let chance: Chance.Chance;
    let distro: ProbabilityDistro<string>;
    
    beforeEach(() =>
    {
        chance = new Chance(1517);
        distro = new ProbabilityDistro();
    });

    describe('with several tallies', () =>
    {
        beforeEach(() =>
        {
            distro.tally('was');
            distro.tally('twas');
            distro.tally('night');
            distro.tally('twas');
        });

        it('counts the tallies', () =>
        {
            const tallies = [...distro.tallies.entries()];

            const expectedTallies: [string, number][] = [
                ['was', 1],
                ['twas', 2],
                ['night', 1],
            ];
            expect(tallies).toEqual(expectedTallies);
        });
    
        it('makes good choices', () =>
        {
            expect(distro.getChoice(chance)).toBe('was');
            expect(distro.getChoice(chance)).toBe('twas');
            expect(distro.getChoice(chance)).toBe('night');
            expect(distro.getChoice(chance)).toBe('twas');
            expect(distro.getChoice(chance)).toBe('night');
            expect(distro.getChoice(chance)).toBe('twas');
        });
    });
});
