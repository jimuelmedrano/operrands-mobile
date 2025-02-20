import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";
import { CheckBox } from "@rneui/themed";
import { Divider } from "@rneui/themed";
import moment from "moment";
import { getOrdinal, getLastDayOfTheMonth } from "../utils/date";
import EditErrandsOverlay from "./EditErrandsOverlay";
import { ErrandItemProps } from "../utils/interface";

const ErrandCard = (data: { data: ErrandItemProps }) => {
  const theme = useTheme().theme;
  const [check, setCheck] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={[styles.cardContainer, { borderColor: theme.colors.primary }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Pressable
          onPress={() => {
            toggleOverlay();
          }}
        >
          <Text style={[DefaultStyles.textlg, { color: theme.colors.black }]}>
            {data.data.title}
          </Text>
          <Text
            style={[
              DefaultStyles.text,
              { color: theme.colors.grey3, marginBottom: 8 },
            ]}
            numberOfLines={1}
          >
            {data.data.notes}
          </Text>
        </Pressable>
        <EditErrandsOverlay
          open={visible}
          data={data.data}
          toggleOpen={toggleOverlay}
        />

        <CheckBox
          checked={check}
          containerStyle={{
            padding: 0,
            backgroundColor: "transparent",
            margin: 0,
            marginRight: 0,
          }}
          uncheckedColor={theme.colors.black}
          checkedColor={theme.colors.primary}
          onPress={() => setCheck(!check)}
        />
      </View>

      <Divider />
      <Text
        style={[
          DefaultStyles.text,
          { color: theme.colors.grey3, marginTop: 4, textAlign: "right" },
        ]}
      >
        {getFooter(data.data)}
      </Text>
    </View>
  );
};

export default ErrandCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
  },
});

function getFooter(dataItem: ErrandItemProps) {
  let dueToday = false;
  let footerText = null;
  const currentDate = new Date();

  if (dataItem.repeat === "Daily") {
    dueToday = true;
    footerText = "Daily";
  } else if (dataItem.repeat === "Weekly") {
    footerText = dataItem.repeatDayOfWeek.toString();
    //If today is included in repeat day of week, set due today to true
    dataItem.repeatDayOfWeek.find((e) => e === moment().format("ddd")) !==
      undefined && (dueToday = true);
  } else if (dataItem.repeat === "Monthly") {
    dataItem.repeatDayOfMonth.sort((a, b) => a - b);
    let monthlyFooter: string[] = [];
    dataItem.repeatDayOfMonth.forEach((element) => {
      if (element > 31) {
        monthlyFooter.push("Last day of the month");
        getLastDayOfTheMonth() === currentDate.getDate() && (dueToday = true);
      } else {
        monthlyFooter.push(getOrdinal(element));
        dataItem.repeatDayOfMonth.find((e) => e === currentDate.getDate()) !==
          undefined && (dueToday = true);
      }
    });
    footerText = monthlyFooter.toString();
  } else {
    dataItem.dueDate !== undefined &&
      (footerText = moment(dataItem.dueDate).format("DD-MMM-YYYY"));
  }
  return footerText;
}
