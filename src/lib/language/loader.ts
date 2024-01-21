import { addMessages, init, _ } from "svelte-i18n";

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

export default _;