import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "../context/AuthContext";
import RoutePersistence from "../components/RoutePersistence";
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
          <RoutePersistence />
          <View
            style={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              flex: 1,
              backgroundColor: Colors.background,
            }}
          >
            <Slot />
          </View>
        </AuthContextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
