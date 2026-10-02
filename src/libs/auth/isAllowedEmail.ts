/**
 * 環境変数 ALLOWED_EMAILS（カンマ区切り）に含まれるメールアドレスかどうかを判定する
 * 未設定の場合は誰も許可しない
 */
export const isAllowedEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowedEmails.includes(email.toLowerCase());
};
