import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "@rneui/themed";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DefaultStyles from "../app/theme/defaultStyles";
import { PathString } from "react-hook-form";

const CustomTimePicker = ({
  handleSelect,
  defaultValue,
}: {
  handleSelect: (selectedValue: string) => void;
  defaultValue?: string;
}) => {
  const theme = useTheme().theme;
  const [date, setDate] = useState(
    defaultValue
      ? moment(
          moment().toISOString().split("T")[0] + "T" + defaultValue
        ).toDate()
      : new Date()
  );
  const [open, setOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(defaultValue ? true : false);
  return (
    <View>
      <Pressable
        onPress={() => {
          setOpen(true);
        }}
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
                color: dateSelected ? theme.colors.black : theme.colors.grey3,
              },
            ]}
          >
            {dateSelected ? moment(date).format("hh:mm A") : "Set time"}
          </Text>
          <FontAwesome5 name="clock" size={16} color={theme.colors.black} />
        </View>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="time"
        onConfirm={(date) => {
          setOpen(false);
          setDateSelected(true);
          handleSelect(date.toISOString().split("T")[1]);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CustomTimePicker;

const styles = StyleSheet.create({});
