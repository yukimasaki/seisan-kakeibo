export class FetchError extends Error {
  ok: boolean = false;
}

export const fetcher = async ({
  url,
  token,
}: {
  url: string;
  token: string | null;
}) => {
  if (token === undefined) throw new FetchError("Token is undefined");
  const response =
    token === null
      ? await fetch(url)
      : await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

  if (!response.ok) {
    const error = new FetchError("Failed to fetch");
    error.ok = false;
    throw error;
  }
  return await response.json();
};
