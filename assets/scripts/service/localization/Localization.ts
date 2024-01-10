import { _decorator } from 'cc'
import { LocalizationData } from './data/LocalizationData'
import { LanguageE, LocalizationSheetE } from './entity/LocalizationE'
import { LocalizationCommonT, LocalizationT } from './entity/LocalizationT'
import configRU from './json/localization-ru.json'
const { ccclass } = _decorator


@ccclass('Localization')
export abstract class Localization {
  // INIT
  public static init() {
    LocalizationData.currentLanguage = LanguageE.RU
    LocalizationData.dictionary = {}
    
    this.fillDictionary()
  }

  
  // INTERFACE
  public static getText(sheet: keyof typeof LocalizationSheetE, slug_id: string): string {
    if (!LocalizationData.dictionary[sheet]) {
      console.warn(`Localization - has no sheet <${sheet}>`)

      return slug_id
    }

    if (!LocalizationData.dictionary[sheet][slug_id]) {
      console.warn(`Localization - has no slug_id <${slug_id}> in sheet <${sheet}>`)

      return slug_id
    }

    const text = LocalizationData.dictionary[sheet][slug_id]

    return text
  }

  
  // PRIVATE
  private static fillDictionary() {
    let config = configRU as LocalizationT
    let locale = {}

    for (const key in config){
      locale[key] = {}

      for (const { slug_id, text } of config[key] as LocalizationCommonT[]){
        locale[key][slug_id] = text
      }
    }

    LocalizationData.dictionary = locale
  }

  
  // RESET - BOOT
  public static reset() {
    LocalizationData.currentLanguage = LanguageE.RU
    LocalizationData.dictionary = null
  }
}