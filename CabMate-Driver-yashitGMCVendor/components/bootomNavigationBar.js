import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../constants/styles";
import { useRouter, useSegments } from "expo-router";

const BottomTabNavigator = () => {
  const router = useRouter();
  const segments = useSegments(); // Get the current active route

  // Tab configurations
  const tabs = [
    { name: "Dashboard", icon: "dashboard", url: "drawer/home/homeScreen" },
    {
      name: "New Bookings",
      icon: "post-add",
      url: "/bookings/newBookingScreen",
    },
    {
      name: "Upcoming Booking",
      icon: "check-circle",
      url: "/bookings/acceptBookingScreen",
    },
    {
      name: "Completed Booking",
      icon: "done-all",
      url: "/bookings/completedBookingScreen",
    },
  ];

  // Extract the current active tab based on the URL
  const activeTab =
    tabs.find((tab) => segments.includes(tab.url.split("/").pop()))?.name || "";

  return (
    <View style={styles.container}>
      <View style={styles.bottomTab}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => router.push(tab.url)}
          >
            <MaterialIcons
              name={tab.icon}
              size={28}
              color={activeTab === tab.name ? Colors.primaryColor : "gray"}
            />
            <Text
              style={{
                color: activeTab === tab.name ? Colors.primaryColor : "gray",
                fontSize: 12,
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#f8f8f8",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.whiteColor,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
});

export default BottomTabNavigator;
