import { Chance } from 'chance';

import { ProbabilityDistro } from '../src/probability-distro.js';

describe('ProbabilityDistro', () =>
{
    let chance: Chance.Chance;
    let distro: ProbabilityDistro<string>;
    
    beforeEach(() =>
    {
        chance = new Chance(1553);
        distro = new ProbabilityDistro(chance);
    });

    it('with several tallies', () =>
    {
        distro.tally('was');
        distro.tally('twas');
        distro.tally('night');
        distro.tally('twas');

        const tallies = [...distro.tallies.entries()];

        const expectedTallies: [string, number][] = [
            ['was', 1],
            ['twas', 2],
            ['night', 1],
        ];
        expect(tallies).toEqual(expectedTallies);
    });
});
