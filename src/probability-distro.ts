import { Chance } from 'chance';

import { sumIterator } from './iterable-iterator.js';
import { failproofLookup } from './maps.js';

class ProbabilityDistro<TKey>
{
    public tallies: Map<TKey, number>;

    constructor(private chance: Chance.Chance)
    {
        this.tallies = new Map<TKey, number>();
    }

    public tally(key: TKey): number
    {
        const count = failproofLookup(this.tallies, key, () => 0) + 1;
        this.tallies.set(key, count);
        return count;
    }

    public getChoice(): TKey
    {
        const totalTally = sumIterator(this.tallies.values());

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
}

export
{
    ProbabilityDistro,
};
