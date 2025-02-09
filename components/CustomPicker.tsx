import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Divider, Overlay } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface DataProps {
  value: string;
  label: string;
}

const CustomPicker = ({
  data,
  handleSelect,
  placeHolder,
}: {
  data: DataProps[];
  handleSelect: (selectedValue: string) => void;
  placeHolder: string;
}) => {
  const theme = useTheme().theme;
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(placeHolder);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
          }}
        >
          <Text
            style={[
              DefaultStyles.textlg,
              {
                color:
                  placeHolder === value
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
          height: "40%",
          padding: 16,
        }}
      >
        <Text
          style={[
            DefaultStyles.textlg,
            { color: theme.colors.black, marginBottom: 16 },
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
                  setValue(category.label);
                  handleSelect(category.value);
                  toggleOverlay();
                }}
              >
                <Text
                  style={[
                    DefaultStyles.textlg,
                    { textAlign: "center", marginBottom: 8 },
                  ]}
                >
                  {category.label}
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
