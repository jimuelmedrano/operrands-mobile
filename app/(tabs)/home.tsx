import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultStyles from "../theme/globalStyles";
import { useTheme } from "@rneui/themed";

const home = () => {
  const theme = useTheme().theme;
  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text>home</Text>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
