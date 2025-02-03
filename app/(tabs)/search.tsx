import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { Button, SearchBar, useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const search = () => {
  const theme = useTheme().theme;
  const [search, setSearch] = useState("");
  const updateSearch = (search: React.SetStateAction<string>) => {
    setSearch(search);
    console.log(search);
  };
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
            onChangeText={updateSearch}
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
          >
            <FontAwesome name="plus" size={16} color={theme.colors.primary} />
          </Button>
        </View>
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
    marginVertical: 8,
  },
});
