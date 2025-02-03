import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DefaultStyles from "../theme/defaultStyles";
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
      <View style={DefaultStyles.tabScreenContainer}>
        <Text style={[DefaultStyles.textlg, { color: theme.colors.black }]}>
          CAT
          <Text style={[DefaultStyles.text, { color: theme.colors.primary }]}>
            EGORIES
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default categories;

const styles = StyleSheet.create({});
