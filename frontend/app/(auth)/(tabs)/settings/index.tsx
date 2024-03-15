import { Stack } from "expo-router";
import { Text, View } from "react-native";

const Page = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Einstellungen" }} />
      <Text>Index page of Settings Tab</Text>
    </View>
  );
};

export default Page;
