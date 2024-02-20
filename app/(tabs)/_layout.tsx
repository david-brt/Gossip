import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: "Chats",
          title: "Chats",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Einstellungen",
          title: "Einstellungen",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
