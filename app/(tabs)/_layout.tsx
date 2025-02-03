import Octicons from "@expo/vector-icons/Octicons";
import { useTheme } from "@rneui/themed";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default () => {
  const theme = useTheme().theme;
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.navBar,
          backgroundColor: theme.colors.background,
        },
        tabBarItemStyle: { marginTop: 15 },
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                {
                  backgroundColor: focused
                    ? theme.colors.primary
                    : "transparent",
                },
                styles.navBarItem,
              ]}
            >
              <Octicons size={28} name="home" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                {
                  backgroundColor: focused
                    ? theme.colors.primary
                    : "transparent",
                },
                styles.navBarItem,
              ]}
            >
              <Octicons size={28} name="search" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                {
                  backgroundColor: focused
                    ? theme.colors.primary
                    : "transparent",
                },
                styles.navBarItem,
              ]}
            >
              <Octicons size={28} name="apps" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                {
                  backgroundColor: focused
                    ? theme.colors.primary
                    : "transparent",
                },
                styles.navBarItem,
              ]}
            >
              <Octicons size={28} name="person" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 20,
    height: 70,
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderTopWidth: 1,
    elevation: 0,
  },
  navBarItem: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
});
