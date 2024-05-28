import { Text, View, StyleSheet } from "react-native";
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
  return (
    <View style={[styles.container, borderRadii]}>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ContactCell;
