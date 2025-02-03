import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import theme from "./theme/theme";

const RootLayout = () => {
  const [loaded, error] = useFonts({
    JockeyOne: require("../assets/fonts/JockeyOne-Regular.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
