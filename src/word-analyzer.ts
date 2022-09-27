import { ProbabilityDistro } from './probability-distro.js';
import { failproofLookup } from './maps.js';
import { getStringPartitions } from './number-partition.js';

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

    public analyzeWords(words: string[])
    {
        words.forEach(word => this.analyzeWord(word));
    }

    public analyzeWord(word: string)
    {
        word = normalizeWord(word);
        const normalizedMinSubwordLength = Math.min(this.minSubwordLength, word.length);
        const normalizedMaxSubwordLength = Math.min(this.maxSubwordLength, word.length);

        const stringPartitions = getStringPartitions(word, normalizedMinSubwordLength, normalizedMaxSubwordLength);

        stringPartitions.forEach(stringPartition =>
            {
                for (let i = 0; i < stringPartition.length; i++)
                {
                    const firstSubword = stringPartition[i];

                    // Does this subword start the word?
                    if (i === 0)
                    {
                        this.tallySubwordsFollow(null, firstSubword);
                    }

                    if (i < stringPartition.length - 1)
                    {
                        const secondSubword = stringPartition[i + 1];
                        this.tallySubwordsFollow(firstSubword, secondSubword);
                    }

                    // Does this subword end the word?
                    if (i === stringPartition.length - 1)
                    {
                        this.tallySubwordsFollow(firstSubword, null);
                    }
                }
            });

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
