type EqualityRelation<T> = (value1: T, value2: T) => boolean;

class SetWithEquality<T> extends Set<T>
{
    constructor(private equals: EqualityRelation<T>)
    {
        super();
    }

    /**
     * Appends a new element with a specified value to the end of the Set.
     */
    public add(value: T): this
    {
        const alreadyAdded = [...this].some(v => this.equals(v, value));

        if (!alreadyAdded)
        {
            super.add(value);
        }

        return this;
    }
}

export
{
    SetWithEquality,
};
