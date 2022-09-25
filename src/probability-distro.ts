import { Chance } from 'chance';

import { sumIterator } from './iterable-iterator.js';
import { failproofLookup } from './maps.js';

class ProbabilityDistro<TKey>
{
    public tallies: Map<TKey, number>;

    constructor()
    {
        this.tallies = new Map<TKey, number>();
    }

    public tally(key: TKey): number
    {
        const count = failproofLookup(this.tallies, key, () => 0) + 1;
        this.tallies.set(key, count);
        return count;
    }

    public getChoice(chance: Chance.Chance): TKey
    {
        const totalTally = sumIterator(this.tallies.values());

        const dieRoll = chance.integer({ min: 0, max: totalTally - 1 });

        let currentTally = 0;
        const entries = [...this.tallies.entries()];

        for (let i = 0; i < entries.length; i++)
        {
            const [key, tally] = entries[i];
            currentTally += tally;
            if (dieRoll < currentTally)
            {
                return key;
            }
        }

        // This should not occur!
        return undefined as TKey;
    }
}

export
{
    ProbabilityDistro,
};
