import 'server-only';
import { Dictionary } from './types';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  sv: () => import('./sv.json').then((module) => module.default as Dictionary),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};
