export function fetchApi<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{ items: T }>;
    })
    .then((data) => data.items);
}
