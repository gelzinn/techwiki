type LanguageType = {
  name: string;
  locale: string;
  country_code: string;
};

export const defaultLanguage: LanguageType = {
  name: 'English',
  locale: 'en-US',
  country_code: 'us',
};

export const supportedLanguages: LanguageType[] = [
  {
    name: 'English',
    locale: 'en-US',
    country_code: 'us',
  },
  {
    name: 'Português (Brasil)',
    locale: 'pt-BR',
    country_code: 'br',
  },
];
