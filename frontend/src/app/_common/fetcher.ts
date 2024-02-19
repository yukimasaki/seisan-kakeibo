export const fetcher = async ({
  url,
  token,
}: {
  url: string;
  token: string;
}) => {
  const response = !token
    ? await fetch(url)
    : await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

  if (!response.ok) {
    const error = new Error();
    throw error;
  }
  return await response.json();
};
