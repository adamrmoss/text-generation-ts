import { Chance } from 'chance';

import { ProbabilityDistro } from "./probability-distro.js";
import { failproofLookup } from './maps.js';

class WordAnalyzer
{
    public analyzedWords: Set<string>;
    public subwordFollowingFrequency: Map<string | null, ProbabilityDistro<string | null>>;

    constructor(public minSubwordLength: number, public maxSubwordLength: number, private chance: Chance.Chance)
    {
        this.analyzedWords = new Set<string>();
        this.subwordFollowingFrequency = new Map<string | null, ProbabilityDistro<string | null>>();
    }

    public analyze(word: string)
    {
        for (let startIndex = 0; startIndex <= word.length - this.minSubwordLength; startIndex++)
        {
            for (let firstSubwordLength = this.minSubwordLength; firstSubwordLength <= this.maxSubwordLength; firstSubwordLength++)
            {
                const secondWordIndex = startIndex + firstSubwordLength;
                const firstSubword = word.substring(startIndex, secondWordIndex);
                if (startIndex === 0)
                {
                    this.tallySubwordsFollow(null, firstSubword);                    
                }

                if (secondWordIndex === word.length)
                {
                    this.tallySubwordsFollow(firstSubword, null);
                }

                for (
                    let secondSubwordLength = this.minSubwordLength;
                    secondSubwordLength <= this.maxSubwordLength && secondWordIndex + secondSubwordLength <= word.length;
                    secondSubwordLength++
                ) {
                    const secondSubword = word.substring(secondWordIndex, secondWordIndex + secondSubwordLength);
                    this.tallySubwordsFollow(firstSubword, secondSubword);
                }
            }
        }

        this.analyzedWords.add(word);
    }

    private tallySubwordsFollow(subword1: string | null, subword2: string | null)
    {
        const emptyDistro = new ProbabilityDistro<string | null>(this.chance);
        const distro = failproofLookup(this.subwordFollowingFrequency, subword1, emptyDistro);
        distro.tally(subword2)        
    }
}

export
{
    WordAnalyzer,
};
