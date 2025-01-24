import { createTheme } from "@rneui/themed";

const Colors = {
  green: "#456D5D",
  lightGreen: "#A1C3B6",
  bgLight: "#FAF9F6",
  bgDark: "#1A1B1B",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#272726",
  lightGray: "#EBE7E1",
  red: "#DE3C4B",
  lightRed: "#FF595E",
  yellow: "#FFCA3A",
};

const theme = createTheme({
  lightColors: {
    primary: Colors.green,
    secondary: Colors.lightGreen,
    background: Colors.bgLight,
    white: Colors.white,
    black: Colors.black,
    grey0: Colors.gray,
    grey1: Colors.lightGray,
    greyOutline: Colors.gray,
    searchBg: Colors.lightGray,
    success: Colors.green,
    warning: Colors.yellow,
    error: Colors.red,
    disabled: Colors.lightGray,
    divider: Colors.gray,
  },
  darkColors: {
    primary: Colors.lightGreen,
    secondary: Colors.green,
    background: Colors.bgDark,
    white: Colors.black,
    black: Colors.white,
    grey0: Colors.lightGray,
    grey1: Colors.gray,
    greyOutline: Colors.lightGray,
    searchBg: Colors.gray,
    success: Colors.green,
    warning: Colors.yellow,
    error: Colors.lightRed,
    disabled: Colors.gray,
    divider: Colors.lightGray,
  },
});

export default theme;
