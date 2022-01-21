import { GetServerSidePropsContext } from "next";
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
  users: User[];
  totalCount: number;
}

export async function getUsers(
  page: number,
  ctx: GetServerSidePropsContext = undefined
): Promise<GetUsersResponseProps> {
  const cookies = parseCookies(ctx);

  const { data, headers } = await api.get("users", {
    params: {
      page
    },
    headers: {
      Authorization: `Bearer ${cookies["@dashgo.token"]}`
    }
  });

  const users: User[] = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    };
  });

  const totalCount = Number(headers["x-total-count"]);

  return {
    users,
    totalCount
  };
}

export function useUsers(
  page: number,
  options?: UseQueryOptions<GetUsersResponseProps>
) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options
  });
}
