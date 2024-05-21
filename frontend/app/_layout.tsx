import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import Colors from "../constants/Colors";
import * as SQLite from "expo-sqlite";
import { migrate } from "../lib/migrate";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";

const queryClient = new QueryClient();

const Layout = () => {
  useEffect(() => {
    SQLite.openDatabaseAsync("localdb").then((db) => {
      migrate(db)
        .then(() => {
          const version: { version: number } | null = db.getFirstSync(
            "SELECT * FROM db_version;",
          );
          if (!version) throw new Error("Database version not set");
          console.log(`migrated to version ${version["version"]}`);
        })
        .catch((e) => console.log(e));
    });
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default Layout;
