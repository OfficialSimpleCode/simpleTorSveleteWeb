import { addMessages, init, locale } from "svelte-i18n";

import en from "$lib/language/en.json";
import he from "$lib/language/he.json";
import ru from "$lib/language/ru.json";

addMessages("en", en);
addMessages("he", he);
addMessages("ru", ru);

init({
  fallbackLocale: "en",
  initialLocale: "he",
});

let RTLLanguges: string[] = ["he", "ar"];

export async function handleLocaleChanges(
  localStorage: Storage,
  document: Document
) {
  if (localStorage.getItem("locale") !== null) {
    await locale.set(localStorage.getItem("locale"));
  }
  locale.subscribe((newLanguage) => {
    localStorage.setItem("locale", newLanguage!);
    document.dir = RTLLanguges.includes(newLanguage!) ? "rtl" : "ltr";
  });
}
