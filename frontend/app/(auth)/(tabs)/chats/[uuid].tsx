import { useEffect, useCallback } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getContactByIdAsync } from "expo-contacts";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { createChat } from "../../../../lib/chat";

type MessageResult = {
  anonymous: 0 | 1;
  chat_id: string;
  message_id: number;
  sender_id: number;
  sent: string;
  text: string;
};

type Params = {
  uuid: string;
  contactId?: string;
  number?: string;
};

const Chat = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<Params>();
  const db = useSQLiteContext();

  const loadMessages = async () => {
    if (params.uuid) {
      return [];
    }
    const query = `SELECT * FROM message
      WHERE chat_id = ?`;
    const rows: MessageResult[] = await db.getAllAsync(
      query,
      params.uuid as string,
    );
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
  };

  const loadUsername = async () => {
    if (params.contactId === undefined) {
      return undefined;
    }
    const userId = params.contactId as string;
    const contact = await getContactByIdAsync(userId, ["name"]);
    navigation.setOptions({ title: contact?.name });
    return contact?.name;
  };

  useEffect(() => {
    navigation.setOptions({ title: params.number });
  }, [navigation, params.contactId]);

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: loadMessages,
  });
  const { data: name } = useQuery({
    queryKey: ["userName"],
    queryFn: loadUsername,
  });

  const isNewChat = () => {
    if (messages === undefined) return false;
    if (messages.length > 0) {
      return false;
    }
    return true;
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    if (isNewChat()) {
      if (name === undefined) return;
      await createChat(
        db,
        params.uuid as string,
        name,
        params.contactId as string,
      );
    }
  }, []);

  return (
    <GiftedChat
      messages={messages ? messages : []}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
};

export default Chat;
