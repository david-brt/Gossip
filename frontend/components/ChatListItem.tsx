import { View, StyleSheet } from "react-native";
import { GossipText } from "./text";
import type { Room } from "../types";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  roomName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  time: {
    color: "rgba(0, 0, 0, 0.5)",
  },
});

interface ChatListItemProps {
  room: Room;
}

const ChatListItem = ({ room }: ChatListItemProps) => {
  const lastMessage = room.messages[room.messages.length - 1];
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <GossipText style={styles.roomName}>{room.name}</GossipText>
        <GossipText>{lastMessage.text}</GossipText>
      </View>
      <GossipText style={styles.time}>{lastMessage.time}</GossipText>
    </View>
  );
};

export default ChatListItem;
