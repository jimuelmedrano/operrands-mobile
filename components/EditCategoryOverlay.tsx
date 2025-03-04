import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Input, Overlay } from "@rneui/base";
import DefaultStyles from "../app/theme/defaultStyles";
import { Button, useTheme } from "@rneui/themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { editCategory } from "../utils/firebase/categoryCrud";
import { ErrandItemProps } from "../utils/interface";

const EditCategoryOverlay = ({
  open,
  toggleOpen,
  setNewCategory,
  currentCategories,
  currentCategory,
  categoryId,
  errandData,
}: {
  open: boolean;
  toggleOpen: () => void;
  setNewCategory: (category: string) => void;
  currentCategories: string[];
  currentCategory: string;
  categoryId: string;
  errandData: ErrandItemProps[];
}) => {
  const theme = useTheme().theme;
  const [category, setCategory] = useState("");
  const [saving, setSaving] = useState(false);
  return (
    <Overlay
      isVisible={open}
      animationType="fade"
      onBackdropPress={toggleOpen}
      overlayStyle={[
        styles.overlay,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Overlay isVisible={saving}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Overlay>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View>
            <Text style={[DefaultStyles.textxl, { color: theme.colors.black }]}>
              Rename{" "}
              <Text style={{ color: theme.colors.primary }}>Category</Text>
            </Text>
            <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
              Update your category here and start tracking today.
            </Text>
          </View>
          <Pressable
            onPress={() => {
              toggleOpen();
            }}
          >
            <FontAwesome name="close" size={16} color={theme.colors.grey3} />
          </Pressable>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Input
            inputContainerStyle={[
              DefaultStyles.input,
              {
                backgroundColor: theme.colors.grey1,
                borderBottomWidth: 0,
              },
            ]}
            containerStyle={{
              paddingHorizontal: 0,
            }}
            inputStyle={[DefaultStyles.text, { color: theme.colors.black }]}
            errorStyle={{ marginVertical: 0 }}
            placeholder="Enter category name"
            onChangeText={setCategory}
            value={currentCategory}
          />
        </KeyboardAvoidingView>

        <Button
          title={"Update category"}
          titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
          buttonStyle={[
            DefaultStyles.button,
            {
              backgroundColor: theme.colors.primary,
              width: "100%",
            },
          ]}
          onPress={async () => {
            setSaving(true);
            if (
              await editCategory(
                errandData,
                category,
                currentCategories.map((x) =>
                  x.replace(currentCategory, category)
                ),
                categoryId
              )
            ) {
              setNewCategory(category);
              Alert.alert("Success!", "Added new category.", [
                {
                  text: "OK",
                  onPress: () => {
                    if (toggleOpen) {
                      toggleOpen();
                    }
                  },
                },
              ]);
            } else {
              Alert.alert(
                "Error!",
                "Encountered an error while saving the category. Please try again later."
              );
            }
            setSaving(false);
          }}
        />
      </View>
    </Overlay>
  );
};

export default EditCategoryOverlay;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 24,
    width: "93%",
    height: "30%",
    marginHorizontal: 16,
    padding: 16,
  },
});
