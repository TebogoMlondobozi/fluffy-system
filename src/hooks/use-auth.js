import { useContext } from "react";
import { AuthContext } from "../utils/contexts";

/*This provides the auth context which has details about the logged in user*/

export default function useAuth() {
  return useContext(AuthContext);
}
