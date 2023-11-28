type nativeSortT = (_: Array<number>) => Array<number>;

export const nativeSort: nativeSortT = (numbers) => Array.from(numbers).sort();
