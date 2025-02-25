import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Input, Overlay, Text } from "@rneui/base";
import { useTheme, useThemeMode } from "@rneui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Appearance,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import DefaultStyles from "../theme/defaultStyles";
import { FirebaseError } from "firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { onGoogleButtonPress } from "../../utils/firebase/onGoogleButtonPress";

const Index = () => {
  const auth = getAuth();
  const theme = useTheme().theme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const userInfo = await auth.signInWithEmailAndPassword(email, password);
      console.log("USERINFO+ " + userInfo.user.displayName);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Sign in failed: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <Overlay isVisible={loading}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Overlay>
        <View style={styles.titleContainer}>
          <Text
            style={[
              DefaultStyles.text2xl,
              { color: theme.colors.black, textAlign: "center" },
            ]}
          >
            OP
            <Text style={[DefaultStyles.text, { color: theme.colors.primary }]}>
              ERRANDS
            </Text>
          </Text>
          <Text
            style={[
              DefaultStyles.text,
              { color: theme.colors.black, textAlign: "center" },
            ]}
          >
            Upgrade your life by completing your errands
          </Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={[DefaultStyles.textlg, { color: theme.colors.primary }]}>
            Welcome!
          </Text>
          <Text style={[DefaultStyles.textxl, { color: theme.colors.black }]}>
            Sign in to your account
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.signInForm}>
            <KeyboardAvoidingView behavior="padding">
              <Input
                inputContainerStyle={[
                  DefaultStyles.input,
                  {
                    backgroundColor: theme.colors.grey1,
                    borderBottomWidth: 0,
                  },
                ]}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                inputStyle={[DefaultStyles.text, { color: theme.colors.black }]}
                errorStyle={{ marginVertical: 0 }}
                inputMode="email"
                placeholder="Enter email"
                onChangeText={setEmail}
              />
              <Input
                inputContainerStyle={[
                  DefaultStyles.input,
                  {
                    backgroundColor: theme.colors.grey1,
                    borderBottomWidth: 0,
                  },
                ]}
                inputStyle={DefaultStyles.text}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                inputMode="text"
                secureTextEntry
                placeholder="Enter password"
                onChangeText={setPassword}
              />
            </KeyboardAvoidingView>

            <View style={{ gap: 16 }}>
              <Button
                title={loading ? "Signing in..." : "Sign in"}
                titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
                buttonStyle={[
                  DefaultStyles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={signIn}
              />

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.divider,
                  }}
                />
                <View>
                  <Text
                    style={[
                      DefaultStyles.text,
                      {
                        width: 50,
                        textAlign: "center",
                        color: theme.colors.divider,
                      },
                    ]}
                  >
                    OR
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.divider,
                  }}
                />
              </View>
              <Button
                titleStyle={[DefaultStyles.text, { color: theme.colors.black }]}
                buttonStyle={[
                  DefaultStyles.button,
                  { borderColor: theme.colors.black, borderWidth: 1 },
                ]}
                type="outline"
                onPress={onGoogleButtonPress}
              >
                <FontAwesome
                  name="google"
                  size={20}
                  color={theme.colors.black}
                />
                {"  "}
                Sign in via Google
              </Button>
            </View>
          </View>

          <View>
            <Pressable
              style={{ alignItems: "center", marginBottom: 16 }}
              onPress={() => {
                console.log("FORGOT PASSWORD");
              }}
            >
              <Text
                style={[
                  DefaultStyles.textlg,
                  {
                    color: theme.colors.primary,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Forgot password
              </Text>
            </Pressable>
            <View
              style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
            >
              <Text
                style={[
                  DefaultStyles.textlg,
                  {
                    color: theme.colors.black,
                    textAlign: "center",
                    marginBottom: 24,
                  },
                ]}
              >
                New to Operrands?
              </Text>
              <Pressable
                style={{ alignItems: "center" }}
                onPress={() => {
                  router.push("signup");
                }}
              >
                <Text
                  style={[
                    DefaultStyles.textlg,
                    {
                      color: theme.colors.primary,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  Create an account
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
  },
  titleContainer: {
    width: "100%",
    height: "30%",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  welcomeContainer: {
    marginBottom: 16,
  },
  signInForm: {},
});
