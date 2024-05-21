import { Stack } from "expo-router";
import HeaderRight from "../../../../components/ChatHeaderRight";
import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
});

const TabsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: styles.header,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="new-chat"
        options={{ title: "New Chat", presentation: "modal" }}
      />
    </Stack>
  );
};

export default TabsLayout;
