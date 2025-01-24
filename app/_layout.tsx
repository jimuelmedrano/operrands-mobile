import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Appearance,
} from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@rneui/themed";
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
