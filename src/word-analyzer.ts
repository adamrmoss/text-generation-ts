import { ProbabilityDistro } from './probability-distro.js';
import { failproofLookup } from './maps.js';

class WordAnalyzer
{
    public analyzedWords: Set<string>;
    private subwordFollowingFrequency: Map<string | null, ProbabilityDistro<string | null>>;

    constructor(private minSubwordLength: number, private maxSubwordLength: number)
    {
        this.analyzedWords = new Set<string>();
        this.subwordFollowingFrequency = new Map<string | null, ProbabilityDistro<string | null>>();
    }

    public get firstSubwords(): (string | null)[]
    {
        return [...this.subwordFollowingFrequency.keys()];
    }

    public getDistro(firstSubword: (string | null)): ProbabilityDistro<string | null>
    {
        if (!this.firstSubwords.includes(firstSubword))
        {
            console.error(`${firstSubword} is not a valid firstSubword`);
        }

        return this.subwordFollowingFrequency.get(firstSubword) as ProbabilityDistro<string | null>;
    }

    public analyze(word: string)
    {
        word = normalizeWord(word);

        for (let startIndex = 0; startIndex <= word.length - this.minSubwordLength; startIndex++)
        {
            for (let firstSubwordLength = this.minSubwordLength; firstSubwordLength <= this.maxSubwordLength; firstSubwordLength++)
            {
                const secondWordIndex = startIndex + firstSubwordLength;
                const firstSubword = word.substring(startIndex, secondWordIndex);

                // Does this subword start the word?
                if (startIndex === 0)
                {
                    this.tallySubwordsFollow(null, firstSubword);                    
                }

                // Does this subword end the word?
                const remainingWordLength = word.length - secondWordIndex;
                if (remainingWordLength === 0)
                {
                    this.tallySubwordsFollow(firstSubword, null);
                }

                for (
                    let secondSubwordLength = this.minSubwordLength;
                    secondSubwordLength <= this.maxSubwordLength;
                    secondSubwordLength++
                ) {
                    const residueLength = remainingWordLength - secondSubwordLength;

                    // We tally the subword following if we either end the word
                    // or have enough residue to make another minimal subword
                    if (residueLength === 0 || residueLength >= this.minSubwordLength)
                    {
                        const secondSubword = word.substring(secondWordIndex, secondWordIndex + secondSubwordLength);
                        this.tallySubwordsFollow(firstSubword, secondSubword);
                    }
                }
            }
        }

        this.analyzedWords.add(word);
    }

    private tallySubwordsFollow(subword1: string | null, subword2: string | null)
    {
        // Default to an empty distro in our failproofLookup
        const emptyDistro = () => new ProbabilityDistro<string | null>();
        const distro = failproofLookup(this.subwordFollowingFrequency, subword1, emptyDistro);
        distro.tally(subword2)        
    }
}

function normalizeWord(word: string)
{
    return word.toLowerCase().replaceAll(/[\W_]/g, '');
}

export
{
    WordAnalyzer,
    normalizeWord,
};
