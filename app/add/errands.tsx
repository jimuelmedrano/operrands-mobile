import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DefaultStyles from "../theme/defaultStyles";
import { useTheme } from "@rneui/themed";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FieldValues, useForm } from "react-hook-form";
import ErrandForm from "../../components/ErrandForm";

const errands = () => {
  const theme = useTheme().theme;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      notes: "",
      category: "",
      status: "todo",
      repeat: "",
      due: new Date(),
      startDate: new Date(),
      repeatDayOfWeek: [],
      repeatDayOfMonth: [],
    },
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
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
        <Pressable
          style={{ marginBottom: 16 }}
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

        <Text style={[DefaultStyles.textxl, { color: theme.colors.black }]}>
          ADD NEW
          <Text style={{ color: theme.colors.primary }}> ERRAND</Text>
        </Text>
        <Text style={[DefaultStyles.text, { color: theme.colors.black }]}>
          Create your errands here and start tracking today.
        </Text>
        <ErrandForm />
      </View>
    </SafeAreaView>
  );
};

export default errands;

const styles = StyleSheet.create({});
