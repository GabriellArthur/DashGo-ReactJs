import { parseCookies } from "nookies";
import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../api";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface GetUsersResponseProps {
  user: User;
}

interface UseUserParams {
  id: number;
  token: string;
}

export async function getUser(id: number): Promise<GetUsersResponseProps> {
  const cookies = parseCookies();
  const { data } = await api.get(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies["@dashgo.token"]}`
    }
  });

  return data;
}

export function useUser(
  id: number,
  options?: UseQueryOptions<GetUsersResponseProps>
) {
  return useQuery(["user", id], () => getUser(id), {
    staleTime: 1000 * 60 * 10, // 5 seconds,
    ...options
  });
}
