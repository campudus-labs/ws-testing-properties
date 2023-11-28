export const frequencies = (coll: Array<unknown>) =>
  coll.reduce((acc: Record<string, number>, el) => {
    const key = String(el);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

export const compareFrequencies = <T>(xs: Array<T>, ys: Array<T>) => {
  const xFreqs = frequencies(xs);
  const yFreqs = frequencies(ys);
  const keys = new Set([...Object.keys(xFreqs), ...Object.keys(yFreqs)]);
  return Array.from(keys).reduce(
    (correct, key) => correct && xFreqs[key] === yFreqs[key],
    true,
  );
};
