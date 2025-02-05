import es from '../lang/es.json'

export default class Lang {
  private static translations = { es }
  private static currentLang: string = 'es'

  public static setLang(lang: keyof typeof Lang.translations): void {
    if (Lang.translations[lang]) {
      Lang.currentLang = lang
    }
  }

  public static get(key: keyof typeof es): string {
    return Lang.translations[Lang.currentLang][key] || key
  }
}
