import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import DefaultStyles from "../theme/defaultStyles";
import { Button, Input, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Controller, FieldValues, useForm } from "react-hook-form";
import CustomPicker from "../../components/CustomPicker";
import getCategoryList from "../../sample-data/getCategoryList.json";
import repeatOptions from "../../utils/repeatOptions";
import CustomDatePicker from "../../components/CustomDatePicker";

const errands = () => {
  const theme = useTheme().theme;
  const categoryList = getCategoryList;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      notes: "",
      category: "",
      repeat: "",
      due: new Date(),
    },
  });
  const onSubmit = (data: FieldValues) => console.log(data);
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

        <ScrollView
          style={{ marginTop: 24 }}
          contentContainerStyle={{ rowGap: 8 }}
        >
          {/* Errand title input field*/}
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Errand title
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
                  inputStyle={[
                    DefaultStyles.text,
                    { color: theme.colors.black },
                  ]}
                  placeholder="Input title..."
                  renderErrorMessage={false}
                />
              )}
              name="title"
            />
            {errors.title && (
              <Text style={[DefaultStyles.text, { color: theme.colors.error }]}>
                Errand title is required.
              </Text>
            )}
          </View>

          {/* Errand notes input field*/}
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Errand notes
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  inputContainerStyle={[
                    DefaultStyles.input,
                    {
                      backgroundColor: theme.colors.grey1,
                      borderBottomWidth: 0,
                      height: 100,
                      alignItems: "flex-start",
                    },
                  ]}
                  containerStyle={{
                    paddingHorizontal: 0,
                  }}
                  inputStyle={[
                    DefaultStyles.text,
                    { color: theme.colors.black },
                  ]}
                  placeholder="Input errand notes..."
                  renderErrorMessage={false}
                />
              )}
              name="notes"
            />
          </View>

          {/* Errand category select field*/}
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Errand category
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomPicker
                  data={categoryList}
                  handleSelect={onChange}
                  placeHolder="Select category"
                />
              )}
              name="category"
            />
            {errors.category && (
              <Text style={[DefaultStyles.text, { color: theme.colors.error }]}>
                Category is required.
              </Text>
            )}
          </View>

          {/* Repeat select field*/}
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Repeat
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomPicker
                  data={repeatOptions}
                  handleSelect={onChange}
                  placeHolder="Select repeat"
                />
              )}
              name="repeat"
            />
            {errors.repeat && (
              <Text style={[DefaultStyles.text, { color: theme.colors.error }]}>
                Repeat is required.
              </Text>
            )}
          </View>

          {/* Due date select field*/}
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Repeat
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomDatePicker />
              )}
              name="due"
            />
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 16,
            marginHorizontal: 16,
            width: "100%",
          }}
        >
          <Button
            title={"Create new errand"}
            titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
            buttonStyle={[
              DefaultStyles.button,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default errands;

const styles = StyleSheet.create({});
