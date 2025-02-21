import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "@rneui/themed";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import DefaultStyles from "../app/theme/defaultStyles";

const CustomDatePicker = ({
  handleSelect,
  defaultValue,
}: {
  handleSelect: (selectedValue: Date) => void;
  defaultValue?: Date;
}) => {
  const theme = useTheme().theme;
  const [date, setDate] = useState(defaultValue ? defaultValue : new Date());
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
            {dateSelected
              ? moment(date).format("MMMM DD, YYYY")
              : "Select due date"}
          </Text>
          <FontAwesome5
            name="calendar-alt"
            size={16}
            color={theme.colors.black}
          />
        </View>
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDateSelected(true);
          handleSelect(date);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({});
