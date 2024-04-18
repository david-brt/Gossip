import { Stack } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../context/AuthContext";
import Colors from "../constants/Colors";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const queryClient = new QueryClient();

const Layout = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <View
            style={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              flex: 1,
              backgroundColor: Colors.background,
            }}
          >
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </AuthContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
