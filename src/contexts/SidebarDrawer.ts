import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { createContext } from "react";

type SidebarDrawerContextData = UseDisclosureReturn;

export const SidebarDrawerContext = createContext<SidebarDrawerContextData>(
  {} as SidebarDrawerContextData
);
