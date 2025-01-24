import { Platform, StatusBar, StyleSheet } from "react-native";

const DefaultStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    fontFamily: "JockeyOne",
  },
  textsm: {
    fontFamily: "JockeyOne",
    fontSize: 10,
  },
  textlg: {
    fontFamily: "JockeyOne",
    fontSize: 18,
  },
  textxl: {
    fontFamily: "JockeyOne",
    fontSize: 24,
  },
  text2xl: {
    fontFamily: "JockeyOne",
    fontSize: 32,
  },
  input: {
    height: 50,
    fontFamily: "JockeyOne",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    height: 50,
    borderRadius: 8,
  },
});

export default DefaultStyles;
