const getRandomIndex = (arr: Array<unknown>) =>
  Math.max(0, Math.min(Math.random() * arr.length, arr.length - 1)) | 0;

export const sample = <T>(arr: Array<T>): T | undefined =>
  arr[getRandomIndex(arr)];

const popAtIndex = <T>(i: number, arr: Array<T>) => {
  const element = arr[i];
  const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
  return { el: element, remaining };
};

export const shuffle = <T>(arr: Array<T>, result: Array<T> = []): Array<T> => {
  if (arr.length === 0) return result;
  else {
    const { el, remaining } = popAtIndex(getRandomIndex(arr), arr);
    return shuffle(remaining, [...result, el]);
  }
};
