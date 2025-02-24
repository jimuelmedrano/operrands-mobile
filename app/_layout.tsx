import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import theme from "./theme/theme";
import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import * as SplashScreen from "expo-splash-screen";

const RootLayout = () => {
  const auth = getAuth();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === "index";
    if (user && !inAuthGroup) {
      router.push("(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("index");
    }
  }, [user, initializing]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add" />
      </Stack>
    </ThemeProvider>
  );
};

export default RootLayout;
