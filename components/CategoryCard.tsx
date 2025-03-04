import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ErrandItemProps } from "../utils/interface";
import { router } from "expo-router";

const CategoryCard = ({
  categoryName,
  errands,
}: {
  categoryName: string;
  errands: ErrandItemProps[];
}) => {
  const theme = useTheme().theme;
  return (
    <Pressable
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.colors.primary,
          justifyContent: "space-between",
        },
      ]}
      onPress={() => {
        router.push({
          pathname: "/add/category",
          params: {
            categoryName: categoryName,
          },
        });
      }}
    >
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View
          style={{
            flex: 1,
            overflow: "hidden",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={3}
            style={[DefaultStyles.textlg, { color: theme.colors.white }]}
          >
            {categoryName}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              paddingVertical: 4,
              alignItems: "flex-end",
            }}
          >
            <FontAwesome6
              name="chevron-right"
              size={14}
              color={theme.colors.white}
            />
          </View>

          <Text
            style={[
              DefaultStyles.text2xl,
              { color: theme.colors.white, textAlign: "right" },
            ]}
          >
            {errands.length}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "48.5%",
    height: 100,
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
