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
        ]);

        expectDistroEntries('ban', [
            ['ana', 1],
        ]);

        expectDistroEntries('an', [
            ['ana', 1],
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

    it('can analyze mississippi', () => {
        analyzer.analyze('mississippi');

        const keys = [...analyzer.subwordFollowingFrequency.keys()];

        expect(keys).toEqual([null, 'mi', 'mis', 'is', 'iss', 'ss', 'ssi', 'si', 'sis', 'sip', 'ip', 'ppi', 'pi']);

        expectDistroEntries(null, [
            ['mi', 1],
            ['mis', 1],
        ]);

        expectDistroEntries('mi', [
            ['ss', 1],
            ['ssi', 1],
        ]);

        expectDistroEntries('mis', [
            ['si', 1],
            ['sis', 1],
        ]);

        expectDistroEntries('is', [
            ['si', 2],
            ['sis', 1],
            ['sip', 1],
        ]);

        expectDistroEntries('iss', [
            ['is', 1],
            ['iss', 1],
            ['ip', 1],
        ]);

        expectDistroEntries('ss', [
            ['is', 1],
            ['iss', 1],
            ['ip', 1],
        ]);

        expectDistroEntries('ssi', [
            ['ss', 1],
            ['ssi', 1],
            ['ppi', 1],
        ]);

        expectDistroEntries('si', [
            ['ss', 1],
            ['ssi', 1],
            ['ppi', 1],
        ]);

        expectDistroEntries('sis', [
            ['si', 1],
            ['sip', 1],
        ]);

        expectDistroEntries('sip', [
            ['pi', 1],
        ]);

        expectDistroEntries('ip', [
            ['pi', 1],
        ]);

        expectDistroEntries('ppi', [
            [null, 1],
        ]);

        expectDistroEntries('pi', [
            [null, 1],
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
