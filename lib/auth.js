import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Usuarios de prueba - después conectaremos con MongoDB
        if (credentials.email === 'admin@test.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            email: 'admin@test.com',
            name: 'Admin Test',
            role: 'admin'
          }
        }
        
        if (credentials.email === 'user@test.com' && credentials.password === 'user123') {
          return {
            id: '2',
            email: 'user@test.com',
            name: 'User Test',
            role: 'user'
          }
        }
        
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirigir al dashboard después del login
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
