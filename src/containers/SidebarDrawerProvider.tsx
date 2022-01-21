import { useDisclosure } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import { ReactNode, useEffect } from "react";

import { SidebarDrawerContext } from "../contexts/SidebarDrawer";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export function SidebarDrawerProvider({
  children
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const { asPath } = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
