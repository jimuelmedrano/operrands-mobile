import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultStyles from "../theme/globalStyles";
import { useTheme } from "@rneui/themed";

const categories = () => {
  const theme = useTheme().theme;
  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text>categories</Text>
    </SafeAreaView>
  );
};

export default categories;

const styles = StyleSheet.create({});
