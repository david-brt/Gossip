import { View, StyleSheet } from "react-native";
import { GossipText } from "./text";
import type { Room } from "../types";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  roomName: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

interface ChatListItemProps {
  room: Room;
}

const ChatListItem = ({ room }: ChatListItemProps) => {
  const lastMessage = room.messages[room.messages.length - 1];
  return (
    <View style={styles.container}>
      <GossipText style={styles.roomName}>{room.name}</GossipText>
      <GossipText>{lastMessage.text}</GossipText>
    </View>
  );
};

export default ChatListItem;
