import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";

const AuthContext = createContext({});

async function loadToken() {
  try {
    return SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("An error has occured", error);
    return null;
  }
}

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const isAuth = useSegments()[0] === "(auth)";
  const router = useRouter();
  const { status, data: token } = useQuery({
    queryKey: ["token"],
    queryFn: loadToken,
  });

  useEffect(() => {
    if (status === "error" || (isAuth && !token)) {
      router.replace("/signup");
    } else if (token) {
      router.replace("/");
    }
  }, [status, token, isAuth, router]);

  return (
    <AuthContext.Provider value={{ authToken: token ? token : "" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
