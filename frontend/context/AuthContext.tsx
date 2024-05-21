import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";

export const AuthContext = createContext({ refetch: () => {}, authToken: "" });

async function loadToken() {
  try {
    return SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("An error has occured", error);
    return null;
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const isAuth = useSegments()[0] === "(auth)";
  const router = useRouter();
  const {
    status,
    data: token,
    refetch,
  } = useQuery({
    queryKey: ["token"],
    queryFn: loadToken,
  });

  useEffect(() => {
    if (status === "pending") return;
    if (status === "error" || (isAuth && !token)) {
      router.replace("/signup");
    }
    router.replace("/chats");
  }, [token, status]);

  return (
    <AuthContext.Provider value={{ authToken: token ? token : "", refetch }}>
      {children}
    </AuthContext.Provider>
  );
};
