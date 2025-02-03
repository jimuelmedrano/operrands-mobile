import {
  Appearance,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "@rneui/base";
import React, { useEffect } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { useTheme, useThemeMode } from "@rneui/themed";
import { router } from "expo-router";

const profile = () => {
  const theme = useTheme().theme;
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    Appearance.setColorScheme(mode);
  }, [mode]);

  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={DefaultStyles.tabScreenContainer}>
        <Text style={[DefaultStyles.textlg, { color: theme.colors.black }]}>
          MY
          <Text style={[DefaultStyles.text, { color: theme.colors.primary }]}>
            {" "}
            PROFILE
          </Text>
        </Text>
        <Button
          titleStyle={[DefaultStyles.text, { color: theme.colors.black }]}
          buttonStyle={[
            DefaultStyles.button,
            { borderColor: theme.colors.primary },
          ]}
          type="outline"
          onPress={() => {
            setMode(mode === "dark" ? "light" : "dark");
            StatusBar.setBarStyle(
              mode === "dark" ? "dark-content" : "light-content"
            );
          }}
        >
          Dark mode
        </Button>
        <Button
          title={"Sign out"}
          titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
          buttonStyle={[
            DefaultStyles.button,
            { backgroundColor: theme.colors.error },
          ]}
          onPress={() => {
            router.dismissAll();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({});
