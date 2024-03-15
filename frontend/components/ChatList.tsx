import { View, FlatList } from "react-native";
import type { Room } from "../types";
import ChatListItem from "./ChatListItem";

const styles = {};

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
        ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
      />
    </View>
  );
};

export default ChatList;
