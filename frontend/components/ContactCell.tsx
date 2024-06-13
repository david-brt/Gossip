import * as SQLite from "expo-sqlite";
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
  if (item.phoneNumbers?.length === 0) return null;
  const db = SQLite.useSQLiteContext();
  const router = useRouter();

  async function getChatId() {
    const query = `SELECT * FROM  chat
      NATURAL JOIN chat_user
      NATURAL JOIN user
      NATURAL JOIN phone_number`;
    const rows = await db.getAllAsync(query);
    if (rows.length === 0) {
      const chatId = randomUUID();
      return chatId;
    }
  }

  const onPress = async () => {
    const chatId = await getChatId();
    router.back();
    router.push({ pathname: "/chats/[uuid]", params: { id: chatId } });
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
