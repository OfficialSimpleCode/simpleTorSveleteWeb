import {
  addShiftsFromStrList,
  combinedShuffleShifts,
} from "$lib/utils/shifts_utils";
import {
  dateStrToDateWithTwoDigit,
  dateToDateStrCustomPattern,
} from "$lib/utils/times_utils";
import type Shift from "../general/shift";

export enum ShiftOperations {
  replace = "R",
  add = "A",
}

export const shiftOperationsToStr: { [key in ShiftOperations]: string } = {
  [ShiftOperations.replace]: "R",
  [ShiftOperations.add]: "A",
};

export const shiftOperationsFromStr: { [key: string]: ShiftOperations } = {
  R: ShiftOperations.replace,
  A: ShiftOperations.add,
};

export const shiftOperationsToTextKey: { [key in ShiftOperations]: string } = {
  [ShiftOperations.replace]: "ReplaceExisting",
  [ShiftOperations.add]: "AddToExisting",
};

export default class ShiftChangeRange {
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
    const start = dateStrToDateWithTwoDigit(dates[0], "/");
    const end = dateStrToDateWithTwoDigit(dates[1], "/");
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
    const startStr = dateToDateStrCustomPattern(this.start, `dd/MM/yy`);
    const endStr = dateToDateStrCustomPattern(this.end, `dd/MM/yy`);
    return `${startStr}&${endStr}`;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
