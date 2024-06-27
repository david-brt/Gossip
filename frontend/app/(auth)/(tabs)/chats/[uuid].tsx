import { useEffect, useCallback } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getContactByIdAsync } from "expo-contacts";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { createChat } from "../../../../lib/chat";
import useWebSocket from "react-use-websocket";

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
  const socketUrl = process.env.EXPO_PUBLIC_SOCKET_URL;
  if (!socketUrl) {
    console.error("Could not find web socket url");
    return null;
  }

  const navigation = useNavigation();
  const params = useLocalSearchParams<Params>();
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const loadInitialMessages = async () => {
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

  useEffect(() => {
    if (params.contactId === undefined) {
      return undefined;
    }
    const userId = params.contactId as string;
    const contact = getContactByIdAsync(userId, ["name"]).then((contact) => {
      navigation.setOptions({ title: contact?.name });
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: params.number });
  }, [navigation, params.contactId]);

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: loadInitialMessages,
  });

  useEffect(() => {
    console.log(lastMessage);
    // queryClient.setQueryData(["messages"], (oldData) => {
    //   if (!oldData) return;
    //   return [...oldData];
    // });
  }, [lastMessage]);

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    sendMessage(messages[0].text);
  }, []);

  return (
    <GiftedChat
      messages={messages || []}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
};

export default Chat;
