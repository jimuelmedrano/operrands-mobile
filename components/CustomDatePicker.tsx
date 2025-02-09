import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import DatePicker from "react-native-date-picker";

const CustomDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
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
