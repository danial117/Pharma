import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import prisma from '../../../../prisma/client'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials.email.toString()
        const Password = credentials.password.toString()
        try {
          const user = await prisma.users.findUnique({ where: { email } })
          if (!user) {
            throw new Error('User not found')
          }
          const passwordCorrect = await compare(Password, user.password)
          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
            }
          } else {
            throw new Error('Incorrect password')
          }
        } catch (error) {
          console.error('Authentication error:', error.message)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
