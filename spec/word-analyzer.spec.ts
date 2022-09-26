import { ProbabilityDistro } from '../src/probability-distro';
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

            expect(analyzer.firstSubwords).toEqual([null, 'ba', 'ban', 'an', 'ana', 'na']);

            expectDistroEntries(null, [
                ['ba', 1],
                ['ban', 1],
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
                [null, 1],
            ]);

            expectDistroEntries('na', [
                ['na', 1],
                [null, 1],
            ]);
        });

        it('can analyze mississippi', () => {
            analyzer.analyzeWord('mississippi');

            expect(analyzer.firstSubwords).toEqual(
                [null, 'mi', 'mis', 'is', 'iss', 'ss', 'ssi', 'si', 'sis', 'sip', 'ip', 'ppi', 'pi']
            );

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
    });

    describe('with medium chunks', () =>
    {
        beforeEach(() =>
        {
            analyzer = new WordAnalyzer(2, 4);
        });

        it('can analyze Idaho', () => {
            analyzer.analyzeWord('Idaho');

            expect(analyzer.firstSubwords).toEqual([null, 'id', 'ida', 'da', 'daho', 'aho', 'ho']);

            expectDistroEntries(null, [
                ['id', 1],
                ['ida', 1],
            ]);

            expectDistroEntries('id', [
                ['aho', 1],
            ]);

            expectDistroEntries('ida', [
                ['ho', 1],
            ]);

            expectDistroEntries('da', [
                ['ho', 1],
            ]);

            expectDistroEntries('daho', [
                [null, 1],
            ]);

            expectDistroEntries('aho', [
                [null, 1],
            ]);

            expectDistroEntries('ho', [
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

            expect(analyzer.firstSubwords).toEqual([null, 'ham', 'amps', 'mps', 'mpsh', 'psh', 'hire', 'ire']);

            expectDistroEntries(null, [
                ['id', 1],
                ['ida', 1],
            ]);

            expectDistroEntries('id', [
                ['aho', 1],
            ]);

            expectDistroEntries('ida', [
                ['ho', 1],
            ]);

            expectDistroEntries('da', [
                ['ho', 1],
            ]);

            expectDistroEntries('daho', [
                [null, 1],
            ]);

            expectDistroEntries('aho', [
                [null, 1],
            ]);

            expectDistroEntries('ho', [
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
