import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { isAllowedEmail } from "@/libs/auth/isAllowedEmail";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // 許可されていないアカウントはログイン自体を拒否する
    signIn: ({ user }) => isAllowedEmail(user.email),
  },
});

export { handler as GET, handler as POST };
