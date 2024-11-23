"use client";

import useSWR from "swr";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async () => {
  const response = await fetch(`${apiBaseUrl}/api/get-csrf-token`,
    { 
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
}

export default function getCSRF() {
  const { data, error } = useSWR('CSRF', fetcher)

  if (error) {
    console.error("Error getting CSRF token: ", error);
    return null;
  }
  if (!data) return null;

  return data.csrf_token;
}