import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Overlay } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import DefaultStyles from "../app/theme/defaultStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ErrandForm from "./ErrandForm";
import { ErrandItemProps } from "../utils/interface";

const EditErrandsOverlay = ({
  open,
  data,
  toggleOpen,
}: {
  open: boolean;
  data: ErrandItemProps;
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
            Edit <Text style={{ color: theme.colors.primary }}>Errand</Text>
          </Text>
          <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
            Modify your errands here and start tracking today.
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
      <ErrandForm data={data} toggleOpen={() => toggleOpen()} />
    </Overlay>
  );
};

export default EditErrandsOverlay;

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
