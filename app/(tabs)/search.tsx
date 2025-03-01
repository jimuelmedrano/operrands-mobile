import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { Button, SearchBar, useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAllErrands } from "../../utils/firebase/getAllErrands";
import { getAuth } from "@react-native-firebase/auth";
import ErrandCard from "../../components/ErrandCard";
import { Timestamp } from "@react-native-firebase/firestore";
import { router } from "expo-router";

const search = () => {
  const theme = useTheme().theme;
  const auth = getAuth();
  const [search, setSearch] = useState("");

  const [errandsData, setErrandsData] = useState(new Array());

  const filterErrand = (search: string) => {
    return errandsData.filter((errand) =>
      JSON.stringify(errand).toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    getAllErrands(auth.currentUser!.email!, setErrandsData);
  }, []);

  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={DefaultStyles.tabScreenContainer}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search"
            round
            onChangeText={setSearch}
            value={search}
            containerStyle={[DefaultStyles.searchContainer, { flex: 1 }]}
            inputContainerStyle={{ backgroundColor: theme.colors.grey1 }}
            inputStyle={[DefaultStyles.text, { color: theme.colors.black }]}
          />
          <Button
            titleStyle={[DefaultStyles.text, { color: theme.colors.black }]}
            buttonStyle={[
              DefaultStyles.addButton,
              {
                backgroundColor: theme.colors.grey1,
              },
            ]}
            onPress={() => {
              router.push("add/errands");
            }}
          >
            <FontAwesome name="plus" size={16} color={theme.colors.primary} />
          </Button>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filterErrand(search).map((errandItem, index) => {
            return <ErrandCard key={index} data={errandItem} />;
          })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
});
