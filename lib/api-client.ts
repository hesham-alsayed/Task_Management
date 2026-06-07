const BASE_URL = process.env.BASE_URL!;
const API_KEY = process.env.API_KEY!;

type FetchOptions = RequestInit & {
  path: string;
};


export async function apiFetch({ path, ...options }: FetchOptions) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
      ...(options.headers || {}),
    },
  });

  const data = await res.json(); 
  console.log(data)
  if (!res.ok) { 
    throw data?.message || data.msg || "Something went wrong ";
  }

  return data;
}