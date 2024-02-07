export function length(record: Record<any, any>): number {
  return Object.entries(record).length;
}

export function isEmpty(record: Record<any, any>): boolean {
  return length(record) === 0;
}

export function isNotEmpty(record: Record<any, any>): boolean {
  return !isEmpty(record);
}
