import * as SQLite from "expo-sqlite";
import { uuidExists } from "../lib/chat";
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
  const number = item.phoneNumbers[0];
  const db = SQLite.useSQLiteContext();
  const router = useRouter();

  async function getChatId() {
    const query = `
      SELECT chat_id FROM  chat
      NATURAL JOIN chat_user
      NATURAL JOIN user
      NATURAL JOIN phone_number
      WHERE phone_number.country_code = ? AND phone_number.digits = ?
    `;

    type Row = { chat_id: string } | null;
    const row = (await db.getFirstAsync(
      query,
      number.countryCode || "",
      number.digits || "",
    )) as Row;
    if (row === null) {
      let chatId: string;
      do {
        chatId = randomUUID();
      } while (await uuidExists(db, chatId));
      return chatId;
    }
    return row.chat_id;
  }

  const onPress = async () => {
    const chatId = await getChatId();
    router.back();
    router.push({
      pathname: "/chats/[uuid]",
      params: { uuid: chatId, userId: item.id, number: number.number },
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
