export const fetcher = async ({
  url,
  token,
}: {
  url: string;
  token: string | null;
}) => {
  console.log(token);
  if (token === undefined) throw new Error("Token is undefined");
  const response =
    token === null
      ? await fetch(url)
      : await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

  if (!response.ok) {
    const error = new Error("Failed to fetch");
    throw error;
  }
  return await response.json();
};
