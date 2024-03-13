import { View, FlatList } from "react-native";
import { GossipText } from "./text";
import type { Room } from "../types";

const styles = {
  container: {},
};

interface ChatListProps {
  rooms: Room[];
}

const ChatList = ({ rooms }: ChatListProps) => {
  return (
    <View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GossipText>{item.name}</GossipText>}
        style={styles.container}
      />
    </View>
  );
};

export default ChatList;
