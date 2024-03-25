import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../context/AuthContext";

const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Stack />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
