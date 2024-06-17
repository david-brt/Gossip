import { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { GossipHeading } from "../../../../components/text";
import { useLocalSearchParams, useNavigation } from "expo-router";

const Chat = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  console.log(params);

  useEffect(() => {
    navigation.setOptions({ title: params.number });
  }, [navigation]);

  return (
    <SafeAreaView>
      <View>
        <GossipHeading>Chat</GossipHeading>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
