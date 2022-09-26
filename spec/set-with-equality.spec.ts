import { jsonEquals } from '../src/json-equals.js';
import { SetWithEquality } from '../src/set-with-equality.js';

describe('SetWithEquality', () =>
{
    describe('<number[][]>', () =>
    {
        let set: SetWithEquality<number[][]>;

        beforeEach(() =>
        {
            set = new SetWithEquality<number[][]>(jsonEquals);
        });

        it('should recognize equal arrays', () =>
        {
            set.add([[1]]);
            set.add([[1]]);
            set.add([[1], [2, 3]]);
            set.add([[1], [2, 3]]);

            expect(set.size).toBe(2);
        });
    });
});
