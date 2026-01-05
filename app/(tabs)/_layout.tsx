import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { COLORS } from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary_green,
        tabBarInactiveTintColor: COLORS.primary_bg,
        tabBarStyle: {
          height: Platform.select({ ios: 88, android: 64 }),
          paddingTop: 6,
          paddingBottom: Platform.select({ ios: 22, android: 10 }),
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="new-play"
        options={{
          title: "New Play",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
