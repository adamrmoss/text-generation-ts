import { Chance } from 'chance';

import { WordAnalyzer } from './word-analyzer.js';

class WordGenerator
{
    public generatedWords: Set<string>;

    constructor(private analyzer: WordAnalyzer, private chance: Chance.Chance)
    {
        this.generatedWords = new Set<string>();
        
        // Count all the analyzed words as generated words
        this.analyzer.analyzedWords.forEach(analyzedWord => this.generatedWords.add(analyzedWord));
    }

    public generateWord(): string
    {
        let generatedWord = '';

        let nextSubwordDistro = this.analyzer.getDistro(null);
        let subword = nextSubwordDistro.getChoice(this.chance);

        while (subword !== null)
        {
            generatedWord += subword;
            nextSubwordDistro = this.analyzer.getDistro(subword);    
            subword = nextSubwordDistro.getChoice(this.chance);
        }

        this.generatedWords.add(generatedWord);
        return generatedWord;       
    }
}

export
{
    WordGenerator,
};
