import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";

const AuthContext = createContext({});
const queryClient = new QueryClient();

async function loadToken() {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error loading token");
  }
}

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const isAuth = useSegments()[0] === "(auth)";
  const router = useRouter();
  const {
    status,
    data: token,
    error,
  } = useQuery({
    queryKey: ["token"],
    queryFn: loadToken,
  });

  if (isAuth && !token) {
    router.replace("/(public)/signup");
  }
  if (token) {
    router.replace("/(auth)/");
  }

  return (
    <AuthContext.Provider value={{ authToken: token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
