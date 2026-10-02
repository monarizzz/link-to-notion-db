import withAuth from "next-auth/middleware";
import { isAllowedEmail } from "@/libs/auth/isAllowedEmail";

// ログイン済みでも許可されていないアカウントのセッションは弾く
export const proxy = withAuth({
  callbacks: {
    authorized: ({ token }) => isAllowedEmail(token?.email),
  },
});
