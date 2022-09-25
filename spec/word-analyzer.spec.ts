import { Chance } from 'chance';
import { ProbabilityDistro } from '../src/probability-distro';

import { WordAnalyzer } from '../src/word-analyzer.js';

describe('WordAnalyzer', () =>
{
    let chance: Chance.Chance;
    let analyzer: WordAnalyzer;

    beforeEach(() =>
    {
        chance = new Chance(1553);
        analyzer = new WordAnalyzer(2, 3, chance);
    });

    it('can analyze banana', () => {
        analyzer.analyze('banana');

        const keys = [...analyzer.subwordFollowingFrequency.keys()];

        expect(keys).toEqual([null, 'ba', 'ban', 'an', 'ana', 'na']);

        expectDistroEntries(null, [
            ['ba', 1],
            ['ban', 1]
        ]);

        expectDistroEntries('ba', [
            ['na', 1],
            ['nan', 1]
        ]);

        expectDistroEntries('ban', [
            ['an', 1],
            ['ana', 1]
        ]);

        expectDistroEntries('an', [
            ['an', 1],
            ['ana', 1]
        ]);

        expectDistroEntries('ana', [
            ['na', 1],
            [null, 1]
        ]);

        expectDistroEntries('na', [
            ['na', 1],
            [null, 1]
        ]);
    });

    function expectDistroEntries(
        firstSubword: string | null,
        expectedDistroEntries: [string | null, number][]
    ) {
        const nullDistro = analyzer.subwordFollowingFrequency.get(firstSubword) as ProbabilityDistro<string | null>;
        const distroEntries = [...nullDistro.tallies.entries()];

        expect(distroEntries).toEqual(expectedDistroEntries);
    }
});
