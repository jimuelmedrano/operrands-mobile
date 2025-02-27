import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, Input, useTheme } from "@rneui/themed";
import DefaultStyles from "../theme/defaultStyles";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAuth } from "@react-native-firebase/auth";
import { FirebaseError } from "@firebase/util";

const signup = () => {
  const theme = useTheme().theme;
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    console.log(email, password);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      Alert.alert("Account created! Welcome to Operrands. ");
    } catch (e: any) {
      const err = e as FirebaseError;
      Alert.alert("Sign up failed: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={[DefaultStyles.screenContainer, { flex: 1, paddingTop: 16 }]}
      >
        <Pressable
          style={{ marginBottom: 32 }}
          onPress={() => {
            router.dismiss();
          }}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color={theme.colors.primary}
          />
        </Pressable>

        <Text style={[DefaultStyles.textlg, { color: theme.colors.primary }]}>
          Welcome to Operrands!
        </Text>
        <Text style={[DefaultStyles.text2xl, { color: theme.colors.black }]}>
          Create new account
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginTop: 32,
          }}
        >
          <View>
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
                secureTextEntry
                placeholder="Enter password"
                onChangeText={setPassword}
              />
            </KeyboardAvoidingView>

            <View style={{ gap: 16 }}>
              <Button
                title={loading ? "Creating your account..." : "Create account"}
                titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
                buttonStyle={[
                  DefaultStyles.button,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={signUp}
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
                Sign up via Google
              </Button>
            </View>
          </View>
        </View>

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
            Already have an account?
          </Text>
          <Pressable
            style={{ alignItems: "center" }}
            onPress={() => {
              router.dismiss();
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
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({});
