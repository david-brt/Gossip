import { useEffect, useCallback } from "react";
import { View, SafeAreaView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getContactByIdAsync } from "expo-contacts";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
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
    if (params.userId === undefined) {
      return undefined;
    }
    const userId = params.userId as string;
    const contact = await getContactByIdAsync(userId, ["name"]);
    navigation.setOptions({ title: contact?.name });
    return contact?.name;
  };

  useEffect(() => {
    navigation.setOptions({ title: params.number });
  }, [navigation, params.userId]);

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: loadMessages,
  });
  const { data: name } = useQuery({
    queryKey: ["userName"],
    queryFn: loadUsername,
  });

  const userExists = async () => {
    const query = `
      SELECT * FROM user WHERE contact_id = ?;
    `;
    const row = await db.getFirstAsync(query, params.userId as string);
    return row !== null;
  };

  const createChat = async () => {
    if (name === undefined) return;
    const createChatQuery = `
      INSERT INTO chat (chat_id, name)
      VALUES (?, ?);
    `;
    await db.runAsync(createChatQuery, params.uuid as string, name);
    const uuid = params.uuid as string;
    if (!(await userExists())) {
      const createUserQuery = `
        INSERT INTO user (contact_id, name, profile_picture)
        VALUES (?, ?, ?)
      `;
      await db.runAsync(createUserQuery, params.userId as string, name, "");
    }
    const createChatUserQuery = `
      INSERT INTO chat_user (chat_id, user_id)
      VALUES (?, (
        SELECT user_id from user WHERE contact_id = ?
      ));
    `;
    await db.runAsync(createChatUserQuery, uuid, params.userId as string);
  };

  const isNewChat = () => {
    if (messages === undefined) return false;
    if (messages.length > 0) {
      return false;
    }
    return true;
  };

  const onSend = useCallback(async (messages: IMessage[] = []) => {
    if (isNewChat()) {
      await createChat();
    }
  }, []);

  useEffect(() => {
    userExists().then();
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
