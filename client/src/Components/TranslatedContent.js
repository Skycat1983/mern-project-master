import { useContext } from "react";
import { LangContext } from "../Contexts/LangContext.js";
import { translations } from "../utils/translations";

export default function TranslatedContent({ contentID }) {
  const { language } = useContext(LangContext);

  return translations[language][contentID];
}
