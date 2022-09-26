import { Chance } from 'chance';

import { ProbabilityDistro } from '../src/probability-distro';
import { normalizeWord, WordAnalyzer } from '../src/word-analyzer.js';
import { WordGenerator } from '../src/word-generator.js';

describe('WordGenerator', () =>
{
    let chance: Chance.Chance;
    let analyzer: WordAnalyzer;
    let generator: WordGenerator;

    beforeEach(() =>
    {
        chance = new Chance(1518);
        analyzer = new WordAnalyzer(3, 4);
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
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
            expect(generateUnique()).toBe('');
        });
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

