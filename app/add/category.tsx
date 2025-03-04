import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import DefaultStyles from "../theme/defaultStyles";
import { Button, useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getAllErrands } from "../../utils/firebase/errandCrud";
import { getAuth } from "@react-native-firebase/auth";
import ErrandCard from "../../components/ErrandCard";
import { getCategoryList } from "../../utils/firebase/categoryCrud";
import EditCategoryOverlay from "../../components/EditCategoryOverlay";
import { deleteCategory } from "../../utils/firebase/categoryCrud";
import AddCategoryOverlay from "../../components/AddCategoryOverlay";
import AddErrandWithCategoryOverlay from "../../components/AddErrandWithCategoryOverlay";

const category = () => {
  const theme = useTheme().theme;
  const auth = getAuth();
  const { categoryName } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState(categoryName);
  const [errandsData, setErrandsData] = useState(new Array());
  const [categories, setCategories] = useState(new Array());
  const [categoryId, setCategoryId] = useState("");

  const [editVisible, setEditVisible] = useState(false);
  const toggleEditOverlay = () => {
    setEditVisible(!editVisible);
  };
  const [addVisible, setAddVisible] = useState(false);
  const toggleAddOverlay = () => {
    setAddVisible(!addVisible);
  };

  useEffect(() => {
    getAllErrands(auth.currentUser!.email!, setErrandsData);
    getCategoryList(auth.currentUser!.email!, setCategories, setCategoryId);
  }, []);

  function onDelete() {
    Alert.alert(
      "This category and its errands will be permanently deleted. Confirm delete?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            if (
              await deleteCategory(
                categoryData as string,
                categories,
                categoryId,
                errandsData.filter((errand) => {
                  return errand.category === categoryData;
                })
              )
            ) {
              router.dismiss();
              Alert.alert("Category deleted.", "");
            } else {
              Alert.alert(
                "Error!",
                "Encountered an error while deleting the errand. Please try again later."
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView
      style={[
        DefaultStyles.AndroidSafeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={[DefaultStyles.screenContainer, { flex: 1, paddingTop: 16 }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              router.dismiss();
            }}
          >
            <FontAwesome
              name="chevron-left"
              size={24}
              color={theme.colors.primary}
            />
          </Pressable>
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
              toggleAddOverlay();
            }}
          >
            <FontAwesome name="plus" size={16} color={theme.colors.primary} />
          </Pressable>
        </View>

        <Text style={[DefaultStyles.text2xl, { color: theme.colors.primary }]}>
          {categoryData}
        </Text>
        <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
          Here are the errands under this category
        </Text>
        {errandsData.filter((errand) => {
          return errand.category === categoryData;
        }).length > 0 ? (
          <FlatList
            style={{ marginTop: 24 }}
            showsVerticalScrollIndicator={false}
            data={errandsData.filter((errand) => {
              return errand.category === categoryData;
            })}
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

        <AddErrandWithCategoryOverlay
          category={categoryData as string}
          open={addVisible}
          toggleOpen={() => toggleAddOverlay()}
        />
        <EditCategoryOverlay
          open={editVisible}
          toggleOpen={() => toggleEditOverlay()}
          setNewCategory={setCategoryData}
          currentCategories={categories}
          currentCategory={categoryData as string}
          categoryId={categoryId}
          errandData={errandsData.filter((errand) => {
            return errand.category === categoryData;
          })}
        />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            style={[
              DefaultStyles.button,
              {
                backgroundColor: theme.colors.error,
                justifyContent: "center",
                alignItems: "center",
                width: 50,
              },
            ]}
            onPress={onDelete}
          >
            <FontAwesome name="trash-o" size={24} color={theme.colors.white} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Button
              title={"Edit category"}
              titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
              buttonStyle={[
                DefaultStyles.button,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => {
                toggleEditOverlay();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default category;

const styles = StyleSheet.create({});
