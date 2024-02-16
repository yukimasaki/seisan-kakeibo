export const fetcher = (url: string, token?: string) => {
  if (!token) return fetch(url).then((res) => res.json());
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
