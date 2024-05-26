import { Text, View, StyleSheet } from "react-native";
import { type Contact } from "expo-contacts";

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

type ContactCellProps = {
  item: Contact;
};

const ContactCell = ({ item }: ContactCellProps) => {
  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ContactCell;
