export default class Shift {
  start: Date;
  end: Date;

  constructor({ start, end }: { start: Date; end: Date }) {
    this.start = start;
    this.end = end;
  }
}
