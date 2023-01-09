import I18n from 'react-native-i18n'
import en from './en.json'
import ar from './ar.json'
I18n.fallbacks = true
I18n.translations = {
  en: en,
  ar: ar
}
export const translate = (string, params = {}) => I18n.t(string, params)
export default I18n
