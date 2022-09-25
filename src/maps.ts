function failproofLookup<TKey, TValue>(
    map: Map<TKey, TValue>,
    key: TKey,
    defaultValue: () => TValue
): TValue
{
    if (!map.has(key))
    {
        map.set(key, defaultValue());
    }
    return map.get(key) as TValue;
}

export
{
    failproofLookup,
};
