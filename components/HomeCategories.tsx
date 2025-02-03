import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";

interface Props {
  selected: boolean;
  handleSelect: (selectedCategory: number) => void;
  index: number;
  categoryName: string;
  categoryCount: number;
}

const HomeCategories = (props: Props) => {
  const theme = useTheme().theme;
  return (
    <Pressable
      style={[
        styles.buttonStyle,
        {
          backgroundColor: props.selected
            ? theme.colors.primary
            : theme.colors.background,
          borderColor: theme.colors.primary,
        },
      ]}
      onPress={() => {
        props.handleSelect(props.index);
      }}
    >
      <Text
        style={[
          DefaultStyles.text,
          { color: props.selected ? theme.colors.white : theme.colors.primary },
        ]}
      >
        {props.categoryName + "  "}
      </Text>
      <View
        style={[
          styles.countStyle,
          {
            backgroundColor: props.selected
              ? theme.colors.background
              : theme.colors.primary,
          },
        ]}
      >
        <Text
          style={[
            DefaultStyles.text,
            {
              color: props.selected ? theme.colors.primary : theme.colors.white,
              textAlign: "center",
            },
          ]}
        >
          {props.categoryCount}
        </Text>
      </View>
    </Pressable>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "auto",
    borderRadius: 40,
    borderWidth: 1,
    marginRight: 4,
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  countStyle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: "center",
  },
});
