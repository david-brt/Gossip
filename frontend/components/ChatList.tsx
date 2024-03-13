import { View, FlatList } from "react-native";
import type { Room } from "../types";
import ChatListItem from "./ChatListItem";

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
        renderItem={({ item }) => <ChatListItem room={item}></ChatListItem>}
        style={styles.container}
      />
    </View>
  );
};

export default ChatList;
