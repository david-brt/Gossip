import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Link } from "expo-router";

const ChatHeaderRight = () => {
  return (
    <Link href="./chats/new-chat/" asChild>
      <TouchableOpacity>
        <AntDesign name="addusergroup" size={28} color="black" />
      </TouchableOpacity>
    </Link>
  );
};

export default ChatHeaderRight;
