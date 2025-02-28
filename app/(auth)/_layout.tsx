import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import theme from "../theme/theme";
import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import { SplashScreen } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import googleServicesFile from "../../config/google-services.json";

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  initialRouteName: "index",
};

const AuthLayout = () => {
  const auth = getAuth();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === "/";
    if (user && !inAuthGroup) {
      router.push("(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  GoogleSignin.configure({
    webClientId: googleServicesFile.client[0].oauth_client[1].client_id,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </ThemeProvider>
  );
};

export default AuthLayout;
