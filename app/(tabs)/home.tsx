import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@rneui/themed";
import { router } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ErrandCard from "../../components/ErrandCard";
import HomeCategories from "../../components/HomeCategories";
import { getHomeErrands } from "../../sample-data/sampledata";
import DefaultStyles from "../theme/defaultStyles";

const home = () => {
  const theme = useTheme().theme;
  const [categoryIndex, setCategoryIndex] = useState(0);
  const data = getHomeErrands;
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("MMM DD, YYYY");
  const formattedDay = moment(currentDate).format("dddd");

  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={DefaultStyles.tabScreenContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={[DefaultStyles.textxl, { color: theme.colors.black }]}>
              Hello,{" "}
              <Text
                style={[DefaultStyles.text, { color: theme.colors.primary }]}
              >
                Jimuel Medrano
              </Text>
            </Text>
            <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
              {"Today is " + formattedDay + ", " + formattedDate}
            </Text>
          </View>

          <Pressable
            style={[
              DefaultStyles.addButton,
              {
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.grey1,
              },
            ]}
            onPress={() => {
              router.push("add/errands");
            }}
          >
            <FontAwesome name="plus" size={16} color={theme.colors.primary} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexGrow: 0,
            marginBottom: 16,
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          {data.map((errandCategory, index) => (
            <HomeCategories
              key={index}
              selected={index === categoryIndex}
              handleSelect={setCategoryIndex}
              index={index}
              categoryName={errandCategory.categoryTitle}
              categoryCount={errandCategory.errands.length}
            />
          ))}
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 0, height: "90%" }}
        >
          {data[categoryIndex].errands.map((errandItem, index) => {
            const newErrandItem = errandItem;
            return <ErrandCard key={index} data={errandItem} />;
          })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  homeErrandsContainer: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
