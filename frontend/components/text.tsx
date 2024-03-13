import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

interface TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

// custom text component to facilitate global modifications
export const GossipText = ({ children, style }: TextProps) => {
  const textStyles = StyleSheet.compose(styles.text, style);
  return <Text style={textStyles}>{children}</Text>;
};

export const GossipHeading = ({ children }: TextProps) => {
  return <GossipText style={[styles.h1]}>{children}</GossipText>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
