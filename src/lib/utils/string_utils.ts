import {
  businessTypeFromStr,
  type BusinessesTypes,
} from "$lib/consts/business_types";
import { weekDays } from "$lib/consts/worker_schedule";
import type { Duration } from "$lib/models/core/duration";
import { addDays, format } from "date-fns";
import { translate } from "./translate";

export function durationToString(
  duration: Duration,
  shortTime: number = -1
): string {
  let hours = "";
  let minutes = "";
  let seconds = "";
  let days = "";
  let weeks = "";
  let months = "";
  let daysInt = duration.days;
  if (Math.floor(daysInt / 30) > 0) {
    if (Math.floor(daysInt / 30) === 1) {
      months = translate("month");
    }
    if (Math.floor(daysInt / 30) === 2) {
      months = translate("twoMonths");
    }
    if (Math.floor(daysInt / 30) > 2) {
      months = `${Math.floor(daysInt / 30)} ` + translate("months");
    }
  }
  daysInt -= Math.floor(daysInt / 30) * 30;
  if (Math.floor(daysInt / 7) > 0) {
    if (Math.floor(daysInt / 7) === 1) {
      weeks = translate("week");
    }
    if (Math.floor(daysInt / 7) === 2) {
      weeks = translate("twoWeeks");
    }
    if (Math.floor(daysInt / 7) > 2) {
      weeks = `${Math.floor(daysInt / 7)} ` + translate("weeks");
    }
  }
  daysInt -= Math.floor(daysInt / 7) * 7;
  if (daysInt === 1) {
    days = translate("day");
  }
  if (daysInt === 2) {
    days = translate("twoDays");
  }
  if (daysInt > 2) {
    days = `${daysInt} ` + translate("days");
  }
  let hoursInt = duration.hours - duration.days * 24;
  if (hoursInt === 1) {
    hours = translate("hour");
  }
  if (hoursInt === 2) {
    hours = translate("twoHours");
  }
  if (hoursInt > 2) {
    hours = `${hoursInt}` + translate("hoursChar");
  }
  let minutesInt = duration.minutes - duration.hours * 60;
  minutes = minutesInt > 0 ? `${minutesInt}` + translate("minutesChar") : "";
  let secondsInt = duration.seconds - duration.minutes * 60;
  if (secondsInt === 1) {
    seconds = translate("second", false);
  }
  if (secondsInt > 1) {
    seconds = `${secondsInt}` + " " + translate("seconds");
  }
  let text = "";
  if (duration.days === 365) {
    text = translate("year");
  } else if (duration.days % 365 === 0 && duration.days > 365) {
    text = (duration.days / 365).toFixed(0) + " " + translate("years");
  } else if (weeks === "" && months !== "" && days === "") {
    text = months;
  } else if (weeks !== "" && months === "" && days === "") {
    text = weeks;
  } else if (weeks !== "" && months !== "" && days === "") {
    text = months + " " + translate("and") + weeks;
  } else if (weeks !== "" && months === "" && days !== "") {
    text = weeks + " " + translate("and") + days;
  } else if (weeks === "" && months !== "" && days !== "") {
    text = months + " " + translate("and") + days;
  } else if (weeks !== "" && months !== "" && days !== "") {
    text = months + " ," + weeks + " " + translate("and") + days;
  } else if (minutes === "" && hours === "" && days !== "") {
    text = days;
  } else if (minutes !== "" && hours === "" && days === "") {
    text = minutes;
  } else if (minutes === "" && hours !== "" && days === "") {
    text = hours;
  } else if (minutes !== "" && hours !== "" && days === "") {
    text = hours + " " + translate("and") + minutes;
  } else if (minutes !== "" && hours === "" && days !== "") {
    text = days + " " + translate("and") + minutes;
  } else if (minutes === "" && hours !== "" && days !== "") {
    text = days + " " + translate("and") + hours;
  } else if (minutes !== "" && hours !== "" && days !== "") {
    text = days + " ," + hours + " " + translate("and") + minutes;
  } else if (seconds !== "") {
    text = seconds;
  }
  if (text.length === 0) return "";
  if (shortTime === -1) return text;
  if (shortTime > text.length) return text;

  return text.slice(0, shortTime) + ".." + text.slice(shortTime);
  // This is the dart code
  // return text.replaceRange(shortTime, null, "..");
}

export function getUsablePhone(phoneNumber: string): string {
  return phoneNumber.replace("-", "");
}

export function durationFormated(duration: Duration): string {
  const twoDigits = (n: number) => n.toString().padStart(2, "0");
  const twoDigitMinutes = twoDigits(duration.minutes % 60);
  return `${twoDigits(duration.hours)}:${twoDigitMinutes}`;
}

export function shortName(longName: string): string {
  return longName.split(" ")[0];
}

export function loadBusinessesTypesIntepeter(): Map<string, BusinessesTypes> {
  const interpeter: Map<string, BusinessesTypes> = new Map();
  Object.entries(businessTypeFromStr).forEach(([key, businessType]) => {
    interpeter.set(translate(key), businessType);
  });
  return interpeter;
}

export function getFormatedTime(
  date: Date,
  withTime: boolean = true,
  withDayOfTheWeek: boolean = true
): string {
  const day = format(date, "dd-MM-yyyy");
  const time = format(date, "HH:mm");
  let templete = "DATE DAY IN TIME";
  return templete
    .replaceAll("DATE", day)
    .replaceAll(" TIME", withTime ? " " + time : "")
    .replaceAll("DAY", withDayOfTheWeek ? `(${getDayString(date)})` : "")
    .replaceAll(" IN", withTime ? " " + translate("at") : "");
}

export function getDayString(date: Date, beforeDay: string = ""): string {
  let todayOrTomorrow = "";
  if (
    format(date, "dd-MM-yyyy") === format(addDays(new Date(), 1), "dd-MM-yyyy")
  ) {
    todayOrTomorrow = translate("tomorrow");
  }
  if (format(date, "dd-MM-yyyy") === format(new Date(), "dd-MM-yyyy")) {
    todayOrTomorrow = translate("today");
  }
  const day = weekDays[date.getDay()];
  return `${
    todayOrTomorrow !== "" ? todayOrTomorrow : beforeDay + translate(day)
  }`;
}

export function formatedPhone(phone: string): string {
  try {
    const indexOfhyphen = phone.indexOf("-");
    let formated = phone.substring(indexOfhyphen + 1, phone.length);
    formated = "0" + formated;
    return (
      formated.substring(0, 3) + "-" + formated.substring(3, formated.length)
    );
  } catch (e) {
    return phone;
  }
}

export function convertToKString(value: number): string {
  if (value >= 1000) {
    const result = value / 1000;
    return result.toFixed(0) + "k";
  } else {
    return value.toFixed(0);
  }
}

export function addCommaToNumString(numString: string): string {
  const decimalIndex = numString.indexOf(".");
  let afterDecimal = "";
  if (decimalIndex !== -1) {
    afterDecimal = numString.substring(decimalIndex, numString.length);
    numString = numString.substring(0, decimalIndex);
  }
  numString = numString.replaceAll(",", ""); // Remove existing commas if any
  const reversedNumString = numString.split("").reverse().join(); // Reverse the string
  let newString = "";
  for (let i = 0; i < reversedNumString.length; i++) {
    if (i > 0 && i % 3 === 0) {
      newString += ","; // Add comma after every three characters
    }
    newString += reversedNumString[i];
  }
  const result = newString.split("").reverse().join(); // Reverse the string back
  return result + afterDecimal;
}

export function dateToString(myTime: Date): string {
  return format(myTime, "HH:mm");
}

export function removePhoneNumberPrefix(phoneNumber: string): string {
  if (!phoneNumber.includes("-")) {
    return phoneNumber;
  }
  return "0" + phoneNumber.split("-")[1];
}

export function printDuration(duration: Duration): string {
  const twoDigits = (n: number) => n.toString().padStart(2, "0");
  const twoDigitMinutes = twoDigits(duration.minutes % 60);
  return `${twoDigits(duration.hours)}:${twoDigitMinutes}`;
}

export function timeUuid(): string {
  return Date.now().toString();
}

export function parseVersionToInt(version: string): number {
  /* vaersion - x.x.x 
    output - xxx*/
  const versionSegments = version.split(".");
  let versionNum = 0;
  versionSegments.forEach((element) => {
    versionNum = versionNum * 10 + parseInt(element);
  });
  return versionNum;
}
