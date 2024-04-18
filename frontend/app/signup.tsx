import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import { GossipText } from "../components/text";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import MaskInput from "react-native-mask-input";
import { createUser } from "../lib/api";
import { router } from "expo-router";

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
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
    padding: 24,
  },
  list: {
    flex: 1,
    width: "100%",
    gap: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 16,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.secondary,
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.secondaryFont,
    textAlign: "center",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
});

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const insets = useSafeAreaInsets();
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (phoneNumber: string) => createUser(phoneNumber),
  });

  const onPress = () => {
    mutate(phoneNumber);
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace(`otp/${phoneNumber}`);
    }
  }, [isSuccess]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.list}>
            <GossipText>Bestätige deine Telefonnummer:</GossipText>
            <MaskInput
              value={phoneNumber}
              autoFocus
              inputMode="numeric"
              style={styles.input}
              placeholder="+49 deine Telefonnummer"
              onChangeText={(_, unmasked) => {
                setPhoneNumber(unmasked);
              }}
              mask={GER_PHONE}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              {(!isPending && (
                <GossipText style={styles.buttonText}>Fortfahren</GossipText>
              )) || <ActivityIndicator />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;
