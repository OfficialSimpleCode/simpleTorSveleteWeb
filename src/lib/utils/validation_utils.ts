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
