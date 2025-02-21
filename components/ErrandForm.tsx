import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DefaultStyles from "../app/theme/defaultStyles";
import { Button, Input, useTheme } from "@rneui/themed";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { getCategoryList } from "../sample-data/sampledata";
import repeatOptions from "../utils/repeatOptions";
import CustomPicker from "./CustomPicker";
import CustomDatePicker from "./CustomDatePicker";
import SelectWeekDays from "./SelectWeekDays";
import SelectMonthDays from "./SelectMonthDays";
import { ErrandItemProps } from "../utils/interface";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ErrandForm = (data: { data?: ErrandItemProps }) => {
  const theme = useTheme().theme;
  const categoryList = getCategoryList;
  const [repeat, setRepeat] = useState(data.data ? data.data.repeat : "None");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data.data
      ? data.data
      : {
          title: "",
          notes: "",
          category: "",
          status: "todo",
          repeat: "",
          dueDate: new Date(),
          startDate: new Date(),
          repeatDayOfWeek: [],
          repeatDayOfMonth: [],
        },
  });
  const onSubmitAdd = (data: FieldValues) => {
    console.log("ADD: " + JSON.stringify(data));
  };
  const onSubmitEdit = (data: FieldValues) => {
    console.log("EDIT: " + JSON.stringify(data));
  };
  const onDelete = (data: FieldValues) => {
    console.log("DELETE: " + JSON.stringify(data));
  };

  return (
    <View style={{ flex: 1, paddingTop: 16, justifyContent: "space-between" }}>
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomPicker
                data={categoryList}
                handleSelect={onChange}
                placeHolder="Select category"
                {...(data.data ? { defaultValue: data.data.category } : {})}
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
                handleSelect={(repeatValue) => {
                  onChange(repeatValue);
                  setRepeat(repeatValue);
                }}
                placeHolder="Select repeat"
                {...(data.data ? { defaultValue: data.data.repeat } : {})}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomDatePicker
                  handleSelect={onChange}
                  defaultValue={data.data?.dueDate}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomDatePicker
                  handleSelect={onChange}
                  defaultValue={data.data?.startDate}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectWeekDays
                  handleSelect={onChange}
                  defaultValue={data.data?.repeatDayOfWeek}
                />
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
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectMonthDays
                  handleSelect={onChange}
                  defaultValue={data.data?.repeatDayOfMonth}
                />
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
      </ScrollView>

      {data.data ? (
        <View
          style={{
            flexDirection: "row",
            gap: 8,
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

const styles = StyleSheet.create({});
