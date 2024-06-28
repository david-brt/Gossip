import * as SQLite from "expo-sqlite";
import { uuidExists, getChatId, createChat } from "../lib/chat";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { randomUUID } from "expo-crypto";
import { type Contact } from "expo-contacts";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.secondaryBackground,
  },
});

type ContactCellProps = {
  item: Contact;
  borderRadii: any;
};

const ContactCell = ({ item, borderRadii }: ContactCellProps) => {
  if (item.phoneNumbers === undefined) return null;
  if (item.phoneNumbers.length === 0) return null;
  if (item.id === undefined) return null;

  const number = item.phoneNumbers[0];
  const db = SQLite.useSQLiteContext();
  const router = useRouter();

  async function findChatId() {
    let chatId = await getChatId(
      db,
      number.countryCode || "",
      number.digits || "",
    );
    if (chatId === undefined) {
      chatId = await createChat(db, item.name, item.id as string);
    }
    return chatId;
  }

  const onPress = async () => {
    const chatId = await findChatId();
    router.back();
    router.push({
      pathname: "/chats/[chatId]",
      params: { chatId, contactId: item.id, number: number.number },
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, borderRadii]}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCell;
