import NextI18Next from 'next-i18next'

import isClient from './utils/is-client'
import isDev from './utils/is-dev'

export const TranslationNamespace = {
  Common: 'common'
}

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['de'],
  ns: [TranslationNamespace.Common],
  defaultNS: TranslationNamespace.Common,
  fallbackLng: 'en',
  load: 'languageOnly',
  localePath: isClient() ? 'locales' : 'public/locales',
  debug: isClient() && isDev,
  saveMissing: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format) => format === 'uppercase' ? value.toUpperCase() : value,
  },
})

export const {
  appWithTranslation,
  i18n,
  useTranslation,
  withTranslation,
} = NextI18NextInstance

export const withCommonNamespace = withTranslation(TranslationNamespace.Common)
export const useCommonTranslation = () => useTranslation(TranslationNamespace.Common)

export default NextI18NextInstance
