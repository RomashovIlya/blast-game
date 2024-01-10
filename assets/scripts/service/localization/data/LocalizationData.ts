import { _decorator } from 'cc'
import { LanguageE } from '../entity/LocalizationE'
const { ccclass } = _decorator


@ccclass('LocalizationData')
export abstract class LocalizationData {
  public static activeLanguageList = [ 'EN','RU' ]
  public static currentLanguage: LanguageE = LanguageE.RU
  public static dictionary: {}
}