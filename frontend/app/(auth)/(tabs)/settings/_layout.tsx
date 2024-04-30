import { Stack } from "expo-router";
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
      screenOptions={{ headerShadowVisible: false, headerStyle: styles.header }}
    />
  );
};

export default TabsLayout;
