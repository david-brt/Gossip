import { TouchableOpacity } from "react-native";
import { GossipText } from "./text";
import { useRouter } from "expo-router";

const CancelModal = () => {
  const router = useRouter();
  const onPress = () => {
    if (!router.canGoBack()) {
      router.navigate("/chats");
    }
    router.back();
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <GossipText>abbrechen</GossipText>
    </TouchableOpacity>
  );
};

export default CancelModal;
