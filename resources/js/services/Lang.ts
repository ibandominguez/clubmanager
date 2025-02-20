import es from '../lang/es.json'

export default class Lang {
  private static translations = { es }
  private static currentLang: string = 'es'

  public static ucfirst(str: string): string {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  public static setLang(lang: keyof typeof Lang.translations): void {
    if (Lang.translations[lang]) {
      Lang.currentLang = lang
    }
  }

  public static get(
    key: keyof typeof es,
    config?: { lang?: keyof typeof Lang.translations; ucfirst: boolean }
  ): string {
    const lang = config && config.lang ? config.lang : Lang.currentLang
    const output: string = Lang.translations[lang][key] || key
    return config?.ucfirst ? Lang.ucfirst(output) : output
  }
}
