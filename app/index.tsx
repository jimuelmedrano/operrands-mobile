import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Input, Text } from "@rneui/base";
import { useTheme, useThemeMode } from "@rneui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Appearance,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import DefaultStyles from "./theme/defaultStyles";

const Index = () => {
  //Appearance.setColorScheme("light");
  const theme = useTheme().theme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
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
                inputMode="email"
                placeholder="Enter password"
              />
            </KeyboardAvoidingView>

            <View style={{ gap: 16 }}>
              <Button
                title={"Sign in"}
                titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
                buttonStyle={[
                  DefaultStyles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => {
                  router.push("(tabs)/home");
                }}
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
                  { borderColor: theme.colors.primary },
                ]}
                type="outline"
                onPress={() => {
                  console.log("GOOGLE LOGIN");
                }}
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
            <Text
              style={[
                DefaultStyles.text,
                {
                  color: theme.colors.primary,
                  textDecorationLine: "underline",
                },
              ]}
            >
              {"  "}
              Create an account
            </Text>
          </Text>
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
