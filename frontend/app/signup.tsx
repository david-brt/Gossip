import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { GossipText } from "../components/text";
import { useState } from "react";
import MaskInput from "react-native-mask-input";

const GER_PHONE = [
  `+`,
  "4",
  "9",
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  list: {
    width: "100%",
    display: "flex",
    gap: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
    borderRadius: 6,
  },
});

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.list}>
          <GossipText>Bestätige deine Telefonnummer:</GossipText>
          <MaskInput
            value={phoneNumber}
            autoFocus
            keyboardType="numeric"
            style={styles.input}
            placeholder="+49 deine Telefonnummer"
            onChangeText={(_, unmasked) => {
              setPhoneNumber(unmasked);
            }}
            mask={GER_PHONE}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
