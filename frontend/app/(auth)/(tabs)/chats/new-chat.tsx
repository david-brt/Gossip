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

function normalize(name: string | undefined) {
  if (name === undefined) {
    return "";
  }
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function sortContacts(contacts: Contacts.Contact[]) {
  return contacts.sort((a, b) => {
    const lastNameA = normalize(a.lastName);
    const lastNameB = normalize(b.lastName);
    const firstNameA = normalize(a.firstName);
    const firstNameB = normalize(b.firstName);

    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;

    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;

    return 0;
  });
}

function getStartingLetter(contact: Contacts.Contact) {
  let relevantName = contact.firstName;
  if (contact.firstName === undefined) {
    relevantName = contact.lastName;
  }
  if (contact.contactType === "company") {
    relevantName = contact.company;
  }
  relevantName = relevantName as string;

  let startingLetter = normalize(relevantName[0].toUpperCase());
  if (!/[A-Z]/.test(startingLetter)) {
    startingLetter = "#";
  }
  return startingLetter;
}

function sortAndIndex(contacts: Contacts.Contact[]) {
  sortContacts(contacts);
  let currentIndex = "";
  let res: Array<Contacts.Contact | string> = [];
  contacts.forEach((contact) => {
    const startingLetter = getStartingLetter(contact);
    if (currentIndex !== startingLetter) {
      currentIndex = startingLetter;
      res.push(startingLetter);
    }
    res.push(contact);
  });
  return res;
}

const NewChat = () => {
  const { data } = useQuery({ queryKey: ["contacts"], queryFn: getContacts });

  return (
    <View style={styles.container}>
      {data && (
        <FlashList
          data={sortAndIndex(data)}
          renderItem={({ item }) => {
            if (typeof item === "string") {
              return <Text>{item}</Text>;
            }
            return <ContactCell item={item} />;
          }}
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
