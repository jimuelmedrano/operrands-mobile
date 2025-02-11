import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Overlay } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DefaultStyles from "../app/theme/defaultStyles";

const SelectMonthDays = ({
  handleSelect,
}: {
  handleSelect: (selectedValue: number[]) => void;
}) => {
  const theme = useTheme().theme;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(new Array());
  const days = Array.from(Array(33).keys());

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    handleSelect(selected);
  }, [selected]);

  return (
    <View>
      <Pressable
        onPress={toggleOverlay}
        style={[
          DefaultStyles.button,
          {
            backgroundColor: theme.colors.grey1,
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selected.length < 1 ? (
            <Text
              style={[
                DefaultStyles.textlg,
                {
                  color: theme.colors.grey3,
                },
              ]}
            >
              Select repeat days
            </Text>
          ) : (
            <View style={{ flexDirection: "row", gap: 4 }}>
              {selected
                .sort((n1, n2) => n1 - n2) //sort array ascending
                .map((day, index) => (
                  <View
                    key={index}
                    style={[
                      styles.button,
                      {
                        backgroundColor: theme.colors.primary,
                        borderWidth: 0,
                        width: day !== 32 ? 35 : "auto",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        DefaultStyles.text,
                        { color: theme.colors.white, textAlign: "center" },
                      ]}
                    >
                      {day !== 32 ? day : "Last day of the month"}
                    </Text>
                  </View>
                ))}
            </View>
          )}

          <FontAwesome5
            name="calendar-alt"
            size={16}
            color={theme.colors.black}
          />
        </View>
      </Pressable>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          backgroundColor: theme.colors.background,
          borderRadius: 16,
          width: "80%",
          height: "auto",
          padding: 16,
        }}
      >
        <Text
          style={[
            DefaultStyles.textlg,
            {
              color: theme.colors.black,
              textAlign: "center",
            },
          ]}
        >
          Select repeat days
        </Text>
        <Text
          style={[
            DefaultStyles.text,
            {
              color: theme.colors.black,
              marginBottom: 16,
              textAlign: "center",
            },
          ]}
        >
          {"(Maximum 5 days)"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {days
            .filter((dayCount) => dayCount != 0)
            .map((day, index) => {
              const isDisabled =
                selected.length >= 5
                  ? selected.includes(day)
                    ? false
                    : true
                  : false;
              return (
                <Pressable
                  key={index}
                  disabled={isDisabled}
                  onPress={() => {
                    if (selected.includes(day)) {
                      setSelected(selected.filter((array) => array != day));
                    } else {
                      setSelected((selected) => [...selected, day]);
                    }
                  }}
                  style={[
                    styles.button,
                    {
                      borderColor: theme.colors.primary,
                      backgroundColor: selected.includes(day)
                        ? theme.colors.primary
                        : isDisabled
                        ? theme.colors.grey1
                        : "transparent",
                      width: day !== 32 ? 40 : "auto",
                    },
                  ]}
                >
                  <Text
                    style={[
                      DefaultStyles.textlg,
                      {
                        textAlign: "center",
                        color: selected.includes(day)
                          ? theme.colors.white
                          : theme.colors.black,
                      },
                    ]}
                  >
                    {day !== 32 ? day : "Last day of the month"}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      </Overlay>
    </View>
  );
};

export default SelectMonthDays;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});
