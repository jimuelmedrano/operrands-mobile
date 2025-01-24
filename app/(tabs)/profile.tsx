import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultStyles from "../theme/globalStyles";
import { useTheme } from "@rneui/themed";

const profile = () => {
  const theme = useTheme().theme;
  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text>profile</Text>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
