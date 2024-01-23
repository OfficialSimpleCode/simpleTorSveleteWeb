export class SplayTreeSet<T> extends Set<T> {
  constructor(iterable?: Iterable<T>, compareFn?: (a: T, b: T) => number) {
    super(iterable);
    if (compareFn) {
      this.sort(compareFn);
    }
  }

  private sort(compareFn: (a: T, b: T) => number) {
    this.clear();
    Array.from(this)
      .sort(compareFn)
      .forEach((item) => this.add(item));
  }

  // Custom method to get the latest element
  get last(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }
    const arrayFromSet = Array.from(this);
    return arrayFromSet[arrayFromSet.length - 1];
  }

  // Custom method to get the element at a specific index
  elementAt(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    return Array.from(this)[index];
  }
}
