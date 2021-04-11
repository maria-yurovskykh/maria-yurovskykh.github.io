export function generateRandomArray(size: number, value: number): number[] {
  return Array.from({length: size}, () => Math.floor(Math.random() * value));
}

export function sortIteration(array: number[]): [number[], boolean] {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      [array[i], array[i + 1]] = [array[i + 1], array[i]];
      return [array, false];
    }
  }
  return [array, true];
}
