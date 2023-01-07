import { i18n } from "@tager/admin-services";

import { RU } from "./ru";
import { EN } from "./en";

export function applyTranslations() {
  i18n.addTranslations("ru", "dynamic-field", RU);
  i18n.addTranslations("en", "dynamic-field", EN);
}
