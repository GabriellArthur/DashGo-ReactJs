import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, useEffect, useState } from "react";
import { number } from "yup";

import { AuthContext, SignInCredentials } from "../contexts/Auth";

import { api } from "../services/api";

interface AuthProviderProps {
   children: ReactNode;
}

interface User {
   id: number;
   email: string;
   name: string;
   createdAt: string;
   token: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null);
   const isAuthenticated = !!user;

   const router = useRouter();
   const toast = useToast();

   async function signIn(credentials: SignInCredentials) {
      try {
         const { data } = await api.post("/sessions", credentials);

         setUser({
            id: data.id,
            email: data.email,
            createdAt: data.createdAt,
            name: data.name,
            token: data.token
         });

         setCookie(undefined, "@dashgo.token", data.token);

         router.push("/dashboard");
      } catch (error) { }
   }

   function signOut() {
      destroyCookie(undefined, "@dashgo.token");

      router.push("/");
   }

   useEffect(() => {
      const cookies = parseCookies();
      const token = cookies["@dashgo.token"];

      if (token) {
         api
            .get("/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
               setUser({
                  ...response.data,
                  token
               });

               if (router.asPath === "/") {
                  router.push("/dashboard");
               }
            });
      }
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            isAuthenticated,
            signIn,
            signOut
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
