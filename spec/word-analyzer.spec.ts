import { getStringPartitions } from '../src/number-partition.js';
import { normalizeWord, WordAnalyzer } from '../src/word-analyzer.js';

describe('WordAnalyzer', () =>
{
    let analyzer: WordAnalyzer;

    describe('with small chunks', () =>
    {
        beforeEach(() =>
        {
            analyzer = new WordAnalyzer(2, 3);
        });

        it('can analyze banana', () => {
            analyzer.analyzeWord('banana');

            expect(analyzer.firstSubwords).toEqual([null, 'ban', 'ana', 'ba', 'na']);

            expectDistroEntries(null, [
                ['ban', 1],
                ['ba', 1],
            ]);

            expectDistroEntries('ban', [
                ['ana', 1],
            ]);

            expectDistroEntries('ana', [
                [null, 1],
            ]);

            expectDistroEntries('ba', [
                ['na', 1],
            ]);

            expectDistroEntries('na', [
                ['na', 1],
                [null, 1],
            ]);
        });

        it('can analyze mississippi', () => {
            analyzer.analyzeWord('mississippi');
                        
            expect(analyzer.firstSubwords).toEqual(
                [null, 'mis', 'sis', 'sip', 'pi', 'si', 'ppi', 'ssi', 'ss', 'ip', 'mi', 'iss', 'is']
            );

            expectDistroEntries(null, [
                ['mis', 4],
                ['mi', 5],
            ]);

            expectDistroEntries('mis', [
                ['sis', 2],
                ['si', 2],
            ]);

            expectDistroEntries('sis', [
                ['sip', 1],
                ['si', 1],
            ]);

            expectDistroEntries('sip', [
                ['pi', 2],
            ]);

            expectDistroEntries('pi', [
                [null, 5],
            ]);

            expectDistroEntries('si', [
                ['ppi', 2],
                ['ssi', 1],
                ['ss', 1],
            ]);

            expectDistroEntries('ppi', [
                [null, 4],
            ]);

            expectDistroEntries('ssi', [
                ['ppi', 2],
                ['ssi', 1],
                ['ss', 1],
            ]);

            expectDistroEntries('ss', [
                ['ip', 2],
                ['iss', 1],
                ['is', 2],
            ]);

            expectDistroEntries('ip', [
                ['pi', 3],
            ]);

            expectDistroEntries('mi', [
                ['ssi', 2],
                ['ss', 3],
            ]);

            expectDistroEntries('iss', [
                ['ip', 1],
            ]);

            expectDistroEntries('is', [
                ['sip', 1],
                ['si', 1],
            ]);
        });
    });

    describe('with medium chunks', () =>
    {
        beforeEach(() =>
        {
            analyzer = new WordAnalyzer(2, 4);
        });

        it('can analyze Idaho', () => {
            analyzer.analyzeWord('Idaho');

            expect(analyzer.firstSubwords).toEqual([null, 'ida', 'ho', 'id', 'aho']);

            expectDistroEntries(null, [
                ['ida', 1],
                ['id', 1],
            ]);

            expectDistroEntries('ida', [
                ['ho', 1],
            ]);

            expectDistroEntries('ho', [
                [null, 1],
            ]);

            expectDistroEntries('id', [
                ['aho', 1],
            ]);

            expectDistroEntries('aho', [
                [null, 1],
            ]);
        });

    });

    describe('with similar medium chunks', () =>
    {
        beforeEach(() =>
        {
            analyzer = new WordAnalyzer(3, 4);
        });

        it('can analyze Hampshire', () => {
            analyzer.analyzeWord('Hampshire');

            expect(analyzer.firstSubwords).toEqual([null, 'ham', 'psh', 'ire']);

            expectDistroEntries(null, [
                ['ham', 1],
            ]);

            expectDistroEntries('ham', [
                ['psh', 1],
            ]);

            expectDistroEntries('psh', [
                ['ire', 1],
            ]);

            expectDistroEntries('ire', [
                [null, 1],
            ]);
        });

    });

    function expectDistroEntries(
        firstSubword: string | null,
        expectedDistroEntries: [string | null, number][]
    ) {
        const nullDistro = analyzer.getDistro(firstSubword);
        const distroEntries = [...nullDistro.tallies.entries()];

        expect(distroEntries).toEqual(expectedDistroEntries);
    }
});

describe('normalizeWord()', () =>
{
    it('removes punctuation and converts to lowercase', () =>
    {
        const word = 'A_string-with*Punctuation';
        const normalizedWord = normalizeWord(word);

        expect(normalizedWord).toBe('astringwithpunctuation');
    });
});
