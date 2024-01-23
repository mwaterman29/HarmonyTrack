import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;


const authOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }: { session: any, user: any }) => {
        session.user.id = user.id;
    
        return session
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

export { authOptions };
