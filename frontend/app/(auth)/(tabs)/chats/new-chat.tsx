import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ContactCell from "../../../../components/ContactCell";
import * as Contacts from "expo-contacts";
import { useQuery } from "@tanstack/react-query";

async function getContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const res = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails],
    });
    return res.data;
  }
}

const NewChat = () => {
  const { data } = useQuery({ queryKey: ["contacts"], queryFn: getContacts });

  return (
    <View style={styles.container}>
      {data && (
        <FlashList
          data={data}
          renderItem={({ item }) => <ContactCell item={item} />}
          estimatedItemSize={50}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default NewChat;
