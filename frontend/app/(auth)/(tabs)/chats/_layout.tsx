import { Stack } from "expo-router";
import ChatHeaderRight from "../../../../components/ChatHeaderRight";
import { StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";
import CancelModal from "../../../../components/CancelModal";

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
          headerRight: () => <ChatHeaderRight />,
        }}
      />
      <Stack.Screen
        name="new-chat"
        options={{
          title: "New Chat",
          presentation: "modal",
          headerSearchBarOptions: {
            placeholder: "Nach Namen suchen",
            hideWhenScrolling: false,
          },
          headerLeft: () => <CancelModal />,
        }}
      />
    </Stack>
  );
};

export default TabsLayout;
