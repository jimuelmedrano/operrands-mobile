import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DefaultStyles from "../app/theme/defaultStyles";
import { Button, Input, Overlay, useTheme } from "@rneui/themed";
import { Controller, FieldValues, useForm } from "react-hook-form";
import repeatOptions from "../utils/repeatOptions";
import CustomPicker from "./CustomPicker";
import CustomDatePicker from "./CustomDatePicker";
import SelectWeekDays from "./SelectWeekDays";
import SelectMonthDays from "./SelectMonthDays";
import { ErrandItemProps } from "../utils/interface";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from "moment";
import { getCategoryList } from "../utils/firebase/categoryCrud";
import { getAuth } from "@react-native-firebase/auth";
import {
  addNewErrand,
  editErrand,
  deleteErrand,
} from "../utils/firebase/errandCrud";
import { router } from "expo-router";
import CustomTimePicker from "./CustomTimePicker";

const ErrandForm = ({
  data,
  toggleOpen,
  category,
}: {
  data?: ErrandItemProps;
  toggleOpen?: () => void;
  category?: string;
}) => {
  const theme = useTheme().theme;
  const auth = getAuth();
  const [repeat, setRepeat] = useState(data ? data.repeat : "None");
  const [categories, setCategories] = useState(new Array());
  const [categoryId, setCategoryId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategoryList(auth.currentUser!.email!, setCategories, setCategoryId);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data
      ? data
      : {
          title: "",
          notes: "",
          category: category ? category : "",
          status: "todo",
          repeat: "",
          startDate: moment().toISOString().split("T")[0],
          repeatDayOfWeek: [],
          repeatDayOfMonth: [],
          addedDate: new Date(),
          user: auth.currentUser!.email!,
        },
  });
  const onSubmitAdd = async (data: FieldValues) => {
    console.log(data);
    setSaving(true);
    if (await addNewErrand(data as ErrandItemProps)) {
      Alert.alert("Success!", "Added new errand.", [
        {
          text: "OK",
          onPress: () => {
            if (category) {
              if (toggleOpen) {
                toggleOpen();
              }
            } else {
              router.dismissTo("(tabs)/home");
            }
          },
        },
      ]);
    } else {
      Alert.alert(
        "Error!",
        "Encountered an error while saving the errand. Please try again later."
      );
    }
    setSaving(false);
  };
  const onSubmitEdit = async (data: FieldValues) => {
    setSaving(true);
    if (await editErrand(data as ErrandItemProps)) {
      Alert.alert("Success!", "Updated errand details.", [
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
        "Encountered an error while saving the errand. Please try again later."
      );
    }
    setSaving(false);
  };
  const onDelete = async (data: FieldValues) => {
    Alert.alert(
      "This errand will be removed permanently. Confirm delete?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setSaving(true);
            if (await deleteErrand(data as ErrandItemProps)) {
              Alert.alert("Errand deleted.", "", [
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
                "Encountered an error while deleting the errand. Please try again later."
              );
            }
            setSaving(false);
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 16, justifyContent: "space-between" }}>
      <Overlay isVisible={saving}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Overlay>
      <ScrollView contentContainerStyle={{ rowGap: 8 }}>
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
                inputStyle={[DefaultStyles.text, { color: theme.colors.black }]}
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
                inputStyle={[DefaultStyles.text, { color: theme.colors.black }]}
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
            render={({ field: { onChange } }) => (
              <CustomPicker
                data={categories}
                handleSelect={onChange}
                placeHolder="Select category"
                {...(data ? { defaultValue: data.category } : {})}
                {...(category ? { defaultValue: category } : {})}
                isDisabled={category ? true : false}
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
            render={({ field: { onChange } }) => (
              <CustomPicker
                data={repeatOptions}
                handleSelect={(repeatValue) => {
                  onChange(repeatValue);
                  setRepeat(repeatValue);
                }}
                placeHolder="Select repeat"
                {...(data ? { defaultValue: data.repeat } : {})}
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
        {repeat === "None" && (
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Due date
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  handleSelect={onChange}
                  defaultValue={value}
                />
              )}
              name="dueDate"
            />
          </View>
        )}

        {/* Start date select field*/}
        {repeat === "Daily" && (
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Start Date
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomDatePicker
                  handleSelect={onChange}
                  defaultValue={value}
                />
              )}
              name="startDate"
            />
          </View>
        )}

        {/* Repeat week days select field*/}
        {repeat === "Weekly" && (
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Repeat days
            </Text>
            <Controller
              control={control}
              rules={{
                required: repeat === "Weekly",
              }}
              render={({ field: { onChange, value } }) => (
                <SelectWeekDays handleSelect={onChange} defaultValue={value} />
              )}
              name="repeatDayOfWeek"
            />
            {errors.repeatDayOfWeek && (
              <Text style={[DefaultStyles.text, { color: theme.colors.error }]}>
                Repeat day is required.
              </Text>
            )}
          </View>
        )}
        {/* Repeat month days select field*/}
        {repeat === "Monthly" && (
          <View>
            <Text
              style={[
                DefaultStyles.textlg,
                { color: theme.colors.black, marginBottom: 4 },
              ]}
            >
              Repeat days
            </Text>
            <Controller
              control={control}
              rules={{
                required: repeat === "Monthly",
              }}
              render={({ field: { onChange, value } }) => (
                <SelectMonthDays handleSelect={onChange} defaultValue={value} />
              )}
              name="repeatDayOfMonth"
            />
            {errors.repeatDayOfMonth && (
              <Text style={[DefaultStyles.text, { color: theme.colors.error }]}>
                Repeat day is required.
              </Text>
            )}
          </View>
        )}
        <View>
          <Text
            style={[
              DefaultStyles.textlg,
              { color: theme.colors.black, marginBottom: 4 },
            ]}
          >
            Time
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomTimePicker handleSelect={onChange} defaultValue={value} />
            )}
            name="time"
          />
        </View>
      </ScrollView>

      {data ? (
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            paddingTop: 16,
          }}
        >
          <View>
            <Button
              buttonStyle={[
                DefaultStyles.button,
                {
                  backgroundColor: theme.colors.error,
                  width: 50,
                },
              ]}
              onPress={handleSubmit(onDelete)}
            >
              <FontAwesome
                name="trash-o"
                size={24}
                color={theme.colors.white}
              />
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title={"Update errand"}
              titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
              buttonStyle={[
                DefaultStyles.button,
                {
                  backgroundColor: theme.colors.primary,
                  width: "100%",
                },
              ]}
              onPress={handleSubmit(onSubmitEdit)}
            />
          </View>
        </View>
      ) : (
        <Button
          title={"Create new errand"}
          titleStyle={[DefaultStyles.text, { color: theme.colors.white }]}
          buttonStyle={[
            DefaultStyles.button,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={handleSubmit(onSubmitAdd)}
        />
      )}
    </View>
  );
};

export default ErrandForm;
