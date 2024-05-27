import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../../../lib/contacts";
import ContactCell from "../../../../components/ContactCell";
import Colors from "../../../../constants/Colors";

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
  },
  stickyHeader: {
    backgroundColor: Colors.background,
  },
});

export default NewChat;
