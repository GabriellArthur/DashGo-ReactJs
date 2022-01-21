import { useContext } from "react";

import { SidebarDrawerContext } from "../contexts/SidebarDrawer";

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);

  return context;
}
