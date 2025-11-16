'use client'

import { SessionProvider } from 'next-auth/react'
import { I18nProvider } from '@/lib/i18n'

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <I18nProvider>
        {children}
      </I18nProvider>
    </SessionProvider>
  )
}

