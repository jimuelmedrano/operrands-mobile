import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "@rneui/themed";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ErrandCard from "../../components/ErrandCard";
import HomeCategories from "../../components/HomeCategories";
import DefaultStyles from "../theme/defaultStyles";
import { getAuth } from "@react-native-firebase/auth";
import { getHomeErrands } from "../../utils/firebase/errandCrud";
import { getCategoryList } from "../../utils/firebase/categoryCrud";

const home = () => {
  const theme = useTheme().theme;
  const auth = getAuth();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("MMM DD, YYYY");
  const formattedDay = moment(currentDate).format("dddd");

  const [categories, setCategories] = useState(new Array());
  const [errandsData, setErrandsData] = useState(new Array());
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    getHomeErrands(auth.currentUser!.email!, setErrandsData);
    getCategoryList(auth.currentUser!.email!, setCategories, setCategoryId);
  }, []);

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
                {auth.currentUser?.displayName
                  ? auth.currentUser.displayName
                  : auth.currentUser!.email!.split("@")[0]}
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

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          style={{
            flexGrow: 0,
            marginBottom: 16,
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 8,
          }}
          renderItem={({ item, index }) => {
            return (
              <HomeCategories
                selected={index === categoryIndex}
                handleSelect={setCategoryIndex}
                index={index}
                categoryName={item}
                categoryCount={
                  errandsData.filter((errand) => errand.category === item)
                    .length
                }
              />
            );
          }}
        />
        {errandsData.filter(
          (errand) => errand.category === categories[categoryIndex]
        ).length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={errandsData.filter(
              (errand) => errand.category === categories[categoryIndex]
            )}
            renderItem={({ item }) => {
              return <ErrandCard data={item} />;
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={[DefaultStyles.text, { color: theme.colors.grey3 }]}>
              No errands in this category
            </Text>
            <Text style={[DefaultStyles.text, { color: theme.colors.grey3 }]}>
              Click + to add new errand
            </Text>
          </View>
        )}
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
