import { Chance } from 'chance';

import { capitalize } from '../src/strings.js';
import { WordAnalyzer } from '../src/word-analyzer.js';
import { WordGenerator } from '../src/word-generator.js';

describe('WordGenerator', () =>
{
    let chance: Chance.Chance;
    let analyzer: WordAnalyzer;
    let generator: WordGenerator;

    beforeEach(() =>
    {
        chance = new Chance(1519);
        analyzer = new WordAnalyzer(2, 4);
    });

    describe('generating states', () =>
    {
        beforeEach(() =>
        {
            const sampleStates =
            [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Carolina', 'Colorado',
                'Connecticut', 'Dakota', 'Delaware', 'Florida', 'Georgia', 'Hampshire', 'Hawaii',
                'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Jersey', 'Kansas', 'Kentucky', 'Louisiana',
                'Maine', 'Maryland', 'Massachusetts', 'Mexico', 'Michigan', 'Minnesota', 'Mississippi',
                'Missouri', 'Montana', 'Nebraska', 'Nevada', 'Ohio', 'Oklahoma', 'Oregon',
                'Pennsylvania', 'Rhode', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
                'Washington', 'Wisconsin', 'Wyoming', 'York'
            ];

            analyzer.analyzeWords(sampleStates);
            generator = new WordGenerator(analyzer, chance);
        });

        it('generates some good states', () =>
        {
            expect(generateState()).toBe('Tennecticut');
            expect(generateState()).toBe('Hampshington');
            expect(generateState()).toBe('Connessee');
            expect(generateState()).toBe('Ma');
            expect(generateState()).toBe('Wisconsington');
            expect(generateState()).toBe('Minnebraska');
            expect(generateState()).toBe('Massippi');
            expect(generateState()).toBe('Nebraskansas');
            expect(generateState()).toBe('Pennsas');
            expect(generateState()).toBe('Tennesota');
            expect(generateState()).toBe('Mexiconnecticut');
            expect(generateState()).toBe('Georegon');
            expect(generateState()).toBe('Arkansylvania');
            expect(generateState()).toBe('Connessachusetts');
            expect(generateState()).toBe('Missippi');
            expect(generateState()).toBe('Loraska');
            expect(generateState()).toBe('Wisconnecticut');
            expect(generateState()).toBe('Alaskansas');
            expect(generateState()).toBe('Pennsington');
        });

        function generateState(): string
        {
            return capitalize(generateUnique());
        }
    });

    function generateUnique(): string
    {
        const previouslyGeneratedWords = [...generator.generatedWords];
        const generatedWord = generator.generateWord();

        // Try again if we did not generate a new word
        if (previouslyGeneratedWords.includes(generatedWord))
        {
            return generateUnique();
        }

        return generatedWord;
    }
});

