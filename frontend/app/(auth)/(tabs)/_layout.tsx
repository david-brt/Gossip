import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
  },
  tabLabel: {
    fontSize: 12,
  },
});

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: "Chats",
          title: "Chats",
          tabBarIcon: () => (
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Einstellungen",
          title: "Einstellungen",
          tabBarIcon: () => (
            <Ionicons name="settings-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
