import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultStyles from "../theme/globalStyles";
import { useTheme } from "@rneui/themed";

const search = () => {
  const theme = useTheme().theme;
  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text>search</Text>
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({});
