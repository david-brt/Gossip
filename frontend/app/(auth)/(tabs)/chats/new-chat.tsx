import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../../../lib/contacts";
import { Contact } from "expo-contacts";
import ContactCell from "../../../../components/ContactCell";
import Colors from "../../../../constants/Colors";

function getBorderRadii(index: number, contacts: (Contact | string)[]) {
  let styles: any = {};

  if (index === 0) return StyleSheet.create({});
  const firstInSection = typeof contacts[index - 1] === "string";
  const isLast = index + 1 === contacts.length;
  const lastInSection = isLast || typeof contacts[index + 1] === "string";

  if (firstInSection) {
    styles["borderTopLeftRadius"] = 10;
    styles["borderTopRightRadius"] = 10;
  }
  if (lastInSection) {
    styles["borderBottomLeftRadius"] = 10;
    styles["borderBottomRightRadius"] = 10;
  }
  return StyleSheet.create(styles);
}

const NewChat = () => {
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {data && (
          <FlashList
            data={data.contacts}
            renderItem={({ item, target, index }) => {
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
              return (
                <ContactCell
                  item={item}
                  borderRadii={getBorderRadii(index, data.contacts)}
                />
              );
            }}
            estimatedItemSize={50}
            stickyHeaderIndices={data.stickyHeaderIndices}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectonHeader: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 8,
  },
  stickyHeader: {
    backgroundColor: Colors.background,
  },
});

export default NewChat;
