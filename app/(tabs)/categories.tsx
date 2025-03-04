import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { Button, useTheme } from "@rneui/themed";
import CategoryCard from "../../components/CategoryCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAuth } from "@react-native-firebase/auth";
import { getAllErrands } from "../../utils/firebase/errandCrud";
import { getCategoryList } from "../../utils/firebase/categoryCrud";
import { FlatList } from "react-native";
import AddCategoryOverlay from "../../components/AddCategoryOverlay";

const categories = () => {
  const theme = useTheme().theme;
  const auth = getAuth();

  const [categories, setCategories] = useState(new Array());
  const [errandsData, setErrandsData] = useState(new Array());
  const [categoryId, setCategoryId] = useState("");

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getAllErrands(auth.currentUser!.email!, setErrandsData);
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
              ERRAND{" "}
              <Text
                style={[DefaultStyles.text, { color: theme.colors.primary }]}
              >
                CATEGORIES
              </Text>
            </Text>
            <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
              Organize your errands for better tracking
            </Text>
          </View>
          <Button
            titleStyle={[DefaultStyles.text, { color: theme.colors.black }]}
            buttonStyle={[
              DefaultStyles.addButton,
              {
                backgroundColor: theme.colors.grey1,
              },
            ]}
            onPress={() => {
              toggleOverlay();
            }}
          >
            <FontAwesome name="plus" size={16} color={theme.colors.primary} />
          </Button>
        </View>

        <AddCategoryOverlay
          open={visible}
          toggleOpen={() => toggleOverlay()}
          currentCategories={categories}
          categoryId={categoryId}
        />

        <FlatList
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={categories}
          renderItem={({ item }) => {
            return (
              <CategoryCard
                categoryName={item}
                errands={errandsData.filter((errands) => {
                  return errands.category === item;
                })}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default categories;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },
});
