import Shift from "$lib/models/general/shift";

export function setTo1970(date: Date): Date {
  const newDate = new Date(date);
  newDate.setFullYear(1970);
  newDate.setMonth(0);
  newDate.setDate(1);
  return newDate;
}

export function durationStrikings(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): string {
  // Implement the logic for duration strikings
  // You can adapt the logic from the Dart code here
  return "";
}

///  in case of after we finish the building of the current shift because we iterating like this
///      ["shift1","shift2","shift3"], "shift1" -> check on "shift2"
///      if striking -> currect "shift1" to the combination
///      if before -> imposible (ordered list)
///      if after ->
///              - in case no need to combine the shifts we can just
///                pass to the nex shift to build it,
///              - if the shifts are clipping -> combine them and keep checking the other shifts
///                to see if those shifts need to be in this shift also
export function combinedShuffleShifts(combinedShifts: Shift[]): string[] {
  combinedShifts.sort((a, b) => a.start.getTime() - b.start.getTime());
  const combinedOrderdShifts: Shift[] = [];
  let j = 0;

  for (let i = 0; i < combinedShifts.length; i = j) {
    const addedShift = combinedShifts[i];
    combinedOrderdShifts.push(addedShift);

    for (j = i + 1; j < combinedShifts.length; j++) {
      const currentShift = combinedShifts[j];
      const status = durationStrikings(
        setTo1970(addedShift.start),
        setTo1970(addedShift.end),
        setTo1970(currentShift.start),
        setTo1970(currentShift.end)
      );

      if (status === "AFTER") {
        if (addedShift.end.toUTCString() === currentShift.start.toUTCString()) {
          addedShift.end = currentShift.end;
        } else {
          break;
        }
      }

      if (status === "STRIKE") {
        if (currentShift.start.getTime() < addedShift.start.getTime()) {
          addedShift.start = currentShift.start;
        }

        if (currentShift.end.getTime() > addedShift.end.getTime()) {
          addedShift.end = currentShift.end;
        }
      }
    }
  }

  const timesToReturn: string[] = [];
  combinedOrderdShifts.forEach((shift) => {
    timesToReturn.push(DateFormat("HH:mm").format(shift.start));
    timesToReturn.push(DateFormat("HH:mm").format(shift.end));
  });

  return timesToReturn;
}

export function shiftsFromStrList(strShifts: string[]): Shift[] {
  const combinedShifts: Shift[] = [];

  for (let i = 0; i < strShifts.length; i += 2) {
    const startS = new Date(strShifts[i]);
    const endS = new Date(strShifts[i + 1]);
    combinedShifts.push(new Shift({ start: startS, end: endS }));
  }

  return combinedShifts;
}

export function addShiftsFromStrList(
  shifts: Shift[],
  strShifts: string[]
): void {
  for (let i = 0; i < strShifts.length; i += 2) {
    const startS = new Date(strShifts[i]);
    const endS = new Date(strShifts[i + 1]);
    shifts.push(new Shift({ start: startS, end: endS }));
  }
}
