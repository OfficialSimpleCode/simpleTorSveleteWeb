import {
  contactAsMessageCharsLimit,
  contactAsSubjectCharsLimit,
  noteCharLimit,
} from "$lib/consts/limitation";
import { translate } from "./translate";

export function emailValidation(email: string | null): string | null {
  if (email == null || email === "") return null;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return translate("invalidEmail");
  }

  return null;
}

export function noteValidation(note: string | null): string | null {
  if (note == null) return null;
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

export function contactUsMessageValidation(
  message: string | null
): string | null {
  if (message == null) return translate("mustIncluteChars");
  if (message.length == 0) return translate("mustIncluteChars");
  if (message.trim().length > contactAsMessageCharsLimit)
    return translate("toLong");
  return null;
}

export function contactUsSubjectValidation(
  subject: string | null
): string | null {
  if (subject == null) return translate("mustIncluteChars");
  if (subject.length == 0) return translate("mustIncluteChars");
  if (subject.trim().length > contactAsSubjectCharsLimit)
    return translate("toLong");
  return null;
}
