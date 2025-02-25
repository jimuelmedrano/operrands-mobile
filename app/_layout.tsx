import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import theme from "./theme/theme";
import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import { SplashScreen } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import googleServicesFile from "../config/google-services.json";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(auth)",
};

const RootLayout = () => {
  const [loaded, error] = useFonts({
    JockeyOne: require("../assets/fonts/JockeyOne.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(auth)">
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add" />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
