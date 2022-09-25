class WordAnalyzer
{
    private analyzedWords: Set<string>;
    
    constructor(public minSubwordLength: number, public maxSubwordLength: number)
    {
        this.analyzedWords = new Set<string>();
    }
}

export
{
    WordAnalyzer,
};
