import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ContactCell from "../../../../components/ContactCell";
import * as Contacts from "expo-contacts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Colors from "../../../../constants/Colors";

async function getContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const res = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails],
    });

    const indexedContacts = sortAndIndex(res.data);

    const stickyHeaderIndices = indexedContacts
      .map((item, index) => {
        if (typeof item === "string") {
          return index;
        } else {
          return null;
        }
      })
      .filter((item) => item !== null) as number[];

    return {
      contacts: indexedContacts,
      stickyHeaderIndices: stickyHeaderIndices,
    };
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
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return (
    <View style={styles.container}>
      {data && (
        <FlashList
          data={data.contacts}
          renderItem={({ item, target }) => {
            if (typeof item === "string") {
              return (
                <Text
                  style={[
                    styles.sectonHeader,
                    target ? styles.stickyHeader : {},
                  ]}
                >
                  {item}
                </Text>
              );
            }
            return <ContactCell item={item} />;
          }}
          estimatedItemSize={50}
          stickyHeaderIndices={data.stickyHeaderIndices}
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
  sectonHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stickyHeader: {
    backgroundColor: Colors.background,
  },
});

export default NewChat;
