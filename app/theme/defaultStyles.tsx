import { Platform, StatusBar, StyleSheet } from "react-native";

const DefaultStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tabScreenContainer: {
    height: "96%",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  text: {
    fontFamily: "JockeyOne",
  },
  textsm: {
    fontFamily: "JockeyOne",
    fontSize: 12,
  },
  textlg: {
    fontFamily: "JockeyOne",
    fontSize: 16,
  },
  textxl: {
    fontFamily: "JockeyOne",
    fontSize: 20,
  },
  text2xl: {
    fontFamily: "JockeyOne",
    fontSize: 24,
  },
  text3xl: {
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
  searchContainer: {
    backgroundColor: "transparent",
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 16,
  },
});

export default DefaultStyles;
