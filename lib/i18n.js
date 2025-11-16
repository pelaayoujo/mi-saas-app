// i18n Context and utilities
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('es')
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    // Detect browser language on mount
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || navigator.userLanguage
      const savedLang = localStorage.getItem('linkedai-locale')
      
      if (savedLang) {
        setLocale(savedLang)
      } else if (browserLang.startsWith('en')) {
        setLocale('en')
      } else {
        setLocale('es')
      }
    }
  }, [])

  useEffect(() => {
    // Load translations
    import(`../messages/${locale}.json`)
      .then((mod) => {
        setTranslations(mod.default)
      })
      .catch(() => {
        // Fallback to Spanish if translation file doesn't exist
        import(`../messages/es.json`)
          .then((mod) => setTranslations(mod.default))
      })
  }, [locale])

  const changeLocale = (newLocale) => {
    setLocale(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('linkedai-locale', newLocale)
    }
  }

  return (
    <I18nContext.Provider value={{ locale, translations, changeLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  
  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = context.translations
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }
    
    // Replace params if provided
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }
    
    return value || key
  }
  
  return { t, locale: context.locale, changeLocale: context.changeLocale }
}

