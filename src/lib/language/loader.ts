import { addMessages, init, locale } from "svelte-i18n";

import en from "$lib/language/en.json";
import he from "$lib/language/he.json";
import ru from "$lib/language/ru.json";
import { writable } from "svelte/store";

addMessages("en", en);
addMessages("he", he);
addMessages("ru", ru);

init({
  fallbackLocale: "en",
  initialLocale: "he",
});
export let langStore = writable<string>("en");

let RTLLanguges: string[] = ["he", "ar"];

export function handleLocaleChanges(localStorage: Storage, document: Document) {
  //get local stored lang
  if (localStorage.getItem("locale") != null) {
    locale.set(localStorage.getItem("locale"));
  }

  locale.subscribe((newLanguage) => {
    localStorage.setItem("locale", newLanguage!);
    langStore.set(newLanguage ?? "en");
    document.dir = RTLLanguges.includes(newLanguage!) ? "rtl" : "ltr";
  });
}
