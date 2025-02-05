import en from './en.json' assert { type: 'json' };

export type Language =
  | 'en'
  | 'vi';

export type LanguageResource = typeof en;
export const SUPPORTED_LANGUAGES: Record<
  Language,
  {
    name: string;
    originalName: string;
    flagEmoji: string;
    resource:
    | LanguageResource
    | (() => Promise<{ default: Partial<LanguageResource> }>);
  }
> = {
  en: {
    name: 'English',
    originalName: 'English',
    flagEmoji: '🇬🇧',
    resource: en,
  },
  vi: {
    name: 'Vietnamese',
    originalName: 'Việt Nam',
    flagEmoji: '🇻🇳',
    resource: () => /* webpackChunkName "i18n-vi" */ import('./vi.json'),
  },
};
