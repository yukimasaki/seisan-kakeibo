export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error();
    throw error;
  }
  return await response.json();
};
