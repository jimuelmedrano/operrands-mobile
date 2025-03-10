import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { Button, SearchBar, useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAllErrands } from "../../utils/firebase/errandCrud";
import { getAuth } from "@react-native-firebase/auth";
import ErrandCard from "../../components/ErrandCard";
import { router } from "expo-router";
import { Text } from "@rneui/base";

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

        {filterErrand(search).length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterErrand(search)}
            renderItem={({ item }) => {
              return <ErrandCard data={item} />;
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={[DefaultStyles.text, { color: theme.colors.grey3 }]}>
              No results found
            </Text>
          </View>
        )}
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
