import {
  addShiftsFromStrList,
  combinedShuffleShifts,
} from "$lib/utils/shifts_utils";
import type Shift from "../general/shift";

enum ShiftOperations {
  replace = "R",
  add = "A",
}

const shiftOperationsToStr: { [key in ShiftOperations]: string } = {
  [ShiftOperations.replace]: "R",
  [ShiftOperations.add]: "A",
};

const shiftOperationsFromStr: { [key: string]: ShiftOperations } = {
  R: ShiftOperations.replace,
  A: ShiftOperations.add,
};

const shiftOperationsToTextKey: { [key in ShiftOperations]: string } = {
  [ShiftOperations.replace]: "ReplaceExisting",
  [ShiftOperations.add]: "AddToExisting",
};

class ShiftChangeRange {
  start: Date = new Date(0);
  end: Date = new Date(0);
  operation: ShiftOperations = ShiftOperations.replace;
  shifts: string[] = [];

  constructor({
    start,
    end,
    operation,
    shifts,
  }: {
    start: Date;
    end: Date;
    operation: ShiftOperations;
    shifts: string[];
  }) {
    this.start = start;
    this.end = end;
    this.operation = operation;
    this.shifts = shifts;
  }

  static fromJson(json: Record<string, any>, key: string): ShiftChangeRange {
    const dates = key.split("&");
    const start = new Date(dates[0]);
    const end = new Date(dates[1]);
    const operation =
      shiftOperationsFromStr[json["operation"]] || ShiftOperations.replace;
    const shifts = json["shifts"].map((item: any) => item as string);
    return new ShiftChangeRange({ start, end, operation, shifts });
  }

  static fromShiftChangeRange(range: ShiftChangeRange): ShiftChangeRange {
    const { start, end, operation, shifts } = range;
    return new ShiftChangeRange({ start, end, operation, shifts: [...shifts] });
  }

  isSameAs(range: ShiftChangeRange): boolean {
    return (
      this.start.getTime() === range.start.getTime() &&
      this.end.getTime() === range.end.getTime() &&
      this.operation === range.operation &&
      this.shifts.toString() === range.shifts.toString()
    );
  }

  toJson(): Record<string, any> {
    return {
      operation: shiftOperationsToStr[this.operation],
      shifts: this.shifts,
    };
  }

  combineShifts(defaultShifts: string[]): string[] {
    if (this.operation === ShiftOperations.replace) {
      return this.shifts;
    }

    const combinedShifts: Shift[] = [];
    addShiftsFromStrList(combinedShifts, defaultShifts);
    addShiftsFromStrList(combinedShifts, this.shifts);

    return combinedShuffleShifts(combinedShifts);
  }

  getKey(): string {
    const startStr = this.formatDate(this.start);
    const endStr = this.formatDate(this.end);
    return `${startStr}&${endStr}`;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
