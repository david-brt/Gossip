import { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getContactByIdAsync } from "expo-contacts";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

type MessageResult = {
  anonymous: 0 | 1;
  chat_id: string;
  message_id: number;
  sender_id: number;
  sent: string;
  text: string;
};

const Chat = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const db = useSQLiteContext();

  async function loadMessages() {
    const uuid = params.uuid;
    if (!uuid) {
      return [];
    }
    const query = `SELECT * FROM message
      WHERE chat_id = ?`;
    const rows: MessageResult[] = await db.getAllAsync(query, uuid as string);
    const res = rows.map((row) => {
      return {
        _id: row.chat_id,
        text: row.text,
        createdAt: new Date(row.sent),
        user: {
          _id: row.sender_id,
        },
      };
    });
    return res;
  }

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
  }, [navigation, params.userId]);

  const { data } = useQuery({ queryKey: ["messages"], queryFn: loadMessages });

  return <GiftedChat messages={data} onSend={() => {}} user={{ _id: 1 }} />;
};

export default Chat;
