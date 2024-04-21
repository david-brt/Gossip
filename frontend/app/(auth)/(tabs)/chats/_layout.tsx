import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const TabsLayout = () => {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerRight: () => (
            <TouchableOpacity>
              <AntDesign name="addusergroup" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default TabsLayout;
