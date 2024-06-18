import { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getContactByIdAsync } from "expo-contacts";

const Chat = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ title: params.number });
    if (params.userId !== undefined) {
      const userId = params.userId as string;
      getContactByIdAsync(userId, ["name"])
        .then((contact) => {
          navigation.setOptions({ title: contact?.name });
        })
        .catch((err) => console.log(err));
      return;
    }
  }, [navigation]);

  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

export default Chat;
