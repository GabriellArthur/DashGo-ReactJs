import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from "next";
import { destroyCookie, parseCookies } from "nookies";

import { AuthTokenError } from "../errors/AuthTokenError";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["@dashgo.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      };
    }

    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, "@dashgo.token");

        return {
          redirect: {
            destination: "/",
            permanent: false
          }
        };
      }

      throw error;
    }
  };
}
