import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider, Overlay } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import DefaultStyles from "../app/theme/defaultStyles";

const CustomPicker = ({
  data,
  handleSelect,
  placeHolder,
  defaultValue,
  isDisabled,
}: {
  data: string[];
  handleSelect: (selectedValue: string) => void;
  placeHolder: string;
  defaultValue?: string;
  isDisabled?: boolean;
}) => {
  const theme = useTheme().theme;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : placeHolder);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Pressable
        onPress={toggleOverlay}
        disabled={isDisabled}
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
          <Text
            style={[
              DefaultStyles.textlg,
              {
                color:
                  placeHolder === value
                    ? theme.colors.grey3
                    : isDisabled
                    ? theme.colors.grey3
                    : theme.colors.black,
              },
            ]}
          >
            {value}
          </Text>
          <FontAwesome
            name="chevron-down"
            size={16}
            color={isDisabled ? theme.colors.grey3 : theme.colors.black}
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
          height: "35%",
          padding: 16,
        }}
      >
        <Text
          style={[
            DefaultStyles.textlg,
            {
              color: theme.colors.black,
              marginBottom: 16,
              textAlign: "center",
            },
          ]}
        >
          {placeHolder}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ScrollView
            style={{
              flexGrow: 0,
              marginBottom: 16,
            }}
            contentContainerStyle={{
              paddingVertical: 8,
            }}
          >
            {data.map((category, index) => (
              <Pressable
                key={index}
                style={{ marginVertical: 4 }}
                onPress={() => {
                  setValue(category);
                  handleSelect(category);
                  toggleOverlay();
                }}
              >
                <Text
                  style={[
                    DefaultStyles.textlg,
                    {
                      textAlign: "center",
                      marginBottom: 8,
                      color: theme.colors.black,
                    },
                  ]}
                >
                  {category}
                </Text>
                <Divider />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Overlay>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({});
