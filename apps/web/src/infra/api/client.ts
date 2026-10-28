export const apiClient = async (path: string) => {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL が設定されていません");
  }

  const response = await fetch(new URL(path, baseUrl));

  if (!response.ok) {
    throw new Error(`API の取得に失敗しました (${response.status})`);
  }

  return response.json();
};
