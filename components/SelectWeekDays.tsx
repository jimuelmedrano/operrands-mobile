import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DefaultStyles from "../app/theme/defaultStyles";

const SelectWeekDays = ({
  handleSelect,
  defaultValue,
}: {
  handleSelect: (selectedDays: String[]) => void;
  defaultValue?: String[];
}) => {
  const theme = useTheme().theme;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selected, setSelected] = useState(
    defaultValue ? defaultValue : new Array()
  );

  useEffect(() => {
    handleSelect(selected);
  }, [selected]);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {days.map((data, index) => (
        <Pressable
          key={index}
          onPress={() => {
            if (selected.includes(data)) {
              setSelected(selected.filter((array) => array != data));
            } else {
              setSelected((selected) => [...selected, data]);
            }
          }}
          style={[
            styles.button,
            {
              borderColor: theme.colors.primary,
              backgroundColor: selected.includes(data)
                ? theme.colors.primary
                : "transparent",
            },
          ]}
        >
          <Text
            style={[
              DefaultStyles.textlg,
              {
                textAlign: "center",
                color: selected.includes(data)
                  ? theme.colors.white
                  : theme.colors.black,
              },
            ]}
          >
            {data}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SelectWeekDays;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    width: 45,
  },
});
