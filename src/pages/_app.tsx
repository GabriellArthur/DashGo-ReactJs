import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NProgress from "nprogress";

import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../containers/SidebarDrawerProvider";
import { AuthProvider } from "../containers/AuthProvider";

import { queryClient } from "../services/queryClient";

import "nprogress/nprogress.css";
import "../styles/global.css";

NProgress.configure({
  showSpinner: false
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    function routeChangeStart(url: string) {
      if (router.asPath !== url) {
        NProgress.start();
      }
    }

    function routeChangeComplete() {
      NProgress.done();
    }

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, [router.asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </AuthProvider>

      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;
