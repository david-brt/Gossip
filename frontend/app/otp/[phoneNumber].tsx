import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useState, useEffect, useContext } from "react";
import Colors from "../../constants/Colors";
import { GossipText } from "../../components/text";
import { router } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

const OTP_LENGTH = 6;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  inner: { flex: 1, gap: 20 },
  codeField: { flex: 1, gap: 10 },
  cellContainer: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryBackground,
  },
  cell: {
    flex: 1,
    lineHeight: 38,
    fontSize: 24,
    textAlign: "center",
  },
  focusCell: {
    backgroundColor: Colors.secondary,
    color: Colors.secondaryFont,
  },
});

const OTP = () => {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { authToken, refetch } = useContext(AuthContext);

  useEffect(() => {
    if (value.length === OTP_LENGTH) {
      Keyboard.dismiss();
      refetch();
      router.replace("/chats");
    }
  }, [value]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <GossipText>Gib deinen SMS-Bestätigungscode ein:</GossipText>
          <CodeField
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={OTP_LENGTH}
            rootStyle={styles.codeField}
            keyboardType="number-pad"
            renderCell={({ index, symbol, isFocused }) => {
              return (
                <View
                  style={[styles.cellContainer, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                >
                  <Text style={styles.cell}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OTP;
