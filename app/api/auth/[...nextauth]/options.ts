import GoogleProvider  from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/prisma";

const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

export const authOptions = {
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