import { noteCharLimit } from "$lib/consts/limitation";
import { translate } from "./translate";

export function emailValidation(email: string | null): string | null {
  if (email === null || email === "") return null;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return translate("invalidEmail");
  }

  return null;
}

export function noteValidation(note: string): string {
  if (note.trim().length > noteCharLimit) return translate("tooLongNote");
  return "";
}
export function nameValidation(
  name: string | null,
  options: { withoutTranslate?: boolean } = {}
): string | null {
  const withoutTranslate = options.withoutTranslate || false;

  if (name === null) return name;

  if (name.includes("&&")) {
    return withoutTranslate ? "" : translate("illegalName") + " - &&";
  }

  if (name.includes("~")) {
    return withoutTranslate ? "" : translate("illegalName") + " - ~";
  }

  if (name === "guest") {
    return withoutTranslate ? "" : translate("illegalName") + " - guest";
  }

  if (name.length > 30 || name.length < 2) {
    return withoutTranslate ? "" : translate("illegalName");
  }

  if (name.length > 15 && !name.includes(" ")) {
    return withoutTranslate ? "" : translate("illegalName");
  }

  for (let i = 0; i < Math.min(name.length, 2); i++) {
    if (name[i] === " ") {
      return withoutTranslate ? "" : translate("illegalName");
    }
  }

  return null;
}
