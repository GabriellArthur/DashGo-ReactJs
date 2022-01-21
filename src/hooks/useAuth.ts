import { useContext } from "react";

import { AuthContext } from "../contexts/Auth";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
