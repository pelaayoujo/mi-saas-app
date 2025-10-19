import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from './mongodb'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const client = await clientPromise
          const db = client.db(process.env.MONGODB_DB || 'miSaaS')
          const usersCollection = db.collection('users')

          // Buscar usuario por email
          const user = await usersCollection.findOne({
            email: credentials.email.toLowerCase().trim()
          })

          if (!user) {
            console.log('Usuario no encontrado:', credentials.email)
            return null
          }

          // Verificar contraseña
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          
          if (!isValidPassword) {
            console.log('Contraseña incorrecta para:', credentials.email)
            return null
          }

          // Verificar que el usuario esté activo
          if (user.status !== 'activo') {
            console.log('Usuario inactivo:', credentials.email)
            return null
          }

          // Retornar datos del usuario (sin la contraseña)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.nombre,
            role: user.plan === 'admin' ? 'admin' : 'user',
            plan: user.plan,
            creditos: user.creditos
          }
        } catch (error) {
          console.error('Error en authorize:', error)
          return null
        }
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
        token.plan = user.plan
        token.creditos = user.creditos
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.plan = token.plan
        session.user.creditos = token.creditos
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
