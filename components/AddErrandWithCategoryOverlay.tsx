import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";
import ErrandForm from "./ErrandForm";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const AddErrandWithCategoryOverlay = ({
  open,
  category,
  toggleOpen,
}: {
  open: boolean;
  category: string;
  toggleOpen: () => void;
}) => {
  const theme = useTheme().theme;
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View>
          <Text style={[DefaultStyles.textxl, { color: theme.colors.black }]}>
            Add New <Text style={{ color: theme.colors.primary }}>Errand</Text>
          </Text>
          <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
            Create new errand here and start tracking today.
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
      <ErrandForm category={category} toggleOpen={() => toggleOpen()} />
    </Overlay>
  );
};

export default AddErrandWithCategoryOverlay;

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 24,
    width: "100%",
    height: "85%",
    padding: 16,
    bottom: 0,
    position: "absolute",
    paddingBottom: 32,
  },
});
