import { Chance } from 'chance';

class ProbabilityDistro<TKey>
{
    public tallies: Map<TKey, number>;

    constructor(private chance: Chance.Chance)
    {
        this.tallies = new Map<TKey, number>();
    }

    public tally(key: TKey): number
    {
        const count = this.failproofLookup(key) + 1;
        this.tallies.set(key, count);
        return count;
    }

    public getChoice(): TKey
    {
        const totalTally = [...this.tallies.values()]
            .reduce((prev, curr) => prev + curr, 0);

        const dieRoll = this.chance.integer({ min: 0, max: totalTally });

        let currentTally = 0;
        this.tallies.forEach((value, key) => {
            currentTally += value;
            if (dieRoll < currentTally)
            {
                return key;
            }
        });

        return null as TKey;
    }

    private failproofLookup(key: TKey): number
    {
        if (!this.tallies.has(key))
        {
            this.tallies.set(key, 0);
        }
        return this.tallies.get(key) as number;
    }
}

export
{
    ProbabilityDistro,
};
