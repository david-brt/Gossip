import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../../../constants/Colors";

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
});

const TabsLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, headerStyle: styles.header }}
    >
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
