import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";

const BookingScreen = () => {
  const navigation = useNavigation();
  const [selectedDriver, setSelectedDriver] = useState("");
  const [activeTab, setActiveTab] = useState("past");

  const data = [
    {
      id: 1,
      driver: "Arun Verma",
      pastBooking: [
        {
          id: "PA1",
          details: "Completed ride from Mumbai to Pune on 12th Jan",
        },
        { id: "PA2", details: "Completed ride from Delhi to Agra on 15th Jan" },
      ],
      futureBooking: [
        {
          id: "FA1",
          details: "Scheduled ride from Bangalore to Mysore on 20th Feb",
        },
        {
          id: "FA2",
          details: "Scheduled ride from Chennai to Coimbatore on 22nd Feb",
        },
      ],
      acceptedBooking: [
        {
          id: "AA1",
          details: "Accepted ride from Hyderabad to Vijayawada on 25th Jan",
        },
      ],
    },
    {
      id: 2,
      driver: "Suresh Yadav",
      pastBooking: [
        {
          id: "PB1",
          details: "Completed ride from Jaipur to Udaipur on 10th Jan",
        },
      ],
      futureBooking: [
        {
          id: "FB1",
          details: "Scheduled ride from Kolkata to Darjeeling on 5th March",
        },
      ],
      acceptedBooking: [
        {
          id: "AB1",
          details: "Accepted ride from Lucknow to Kanpur on 28th Jan",
        },
      ],
    },
    {
      id: 3,
      driver: "Vikram Singh",
      pastBooking: [
        {
          id: "PC1",
          details: "Completed ride from Ahmedabad to Surat on 8th Jan",
        },
        {
          id: "PC2",
          details: "Completed ride from Chandigarh to Amritsar on 12th Jan",
        },
      ],
      futureBooking: [
        {
          id: "FC1",
          details: "Scheduled ride from Bhopal to Indore on 18th Feb",
        },
      ],
      acceptedBooking: [
        {
          id: "AC1",
          details: "Accepted ride from Kochi to Trivandrum on 30th Jan",
        },
      ],
    },
  ];

  const driverList = [
    { label: "Arun Verma", value: "Arun Verma" },
    { label: "Suresh Yadav", value: "Suresh Yadav" },
    { label: "Vikram Singh", value: "Vikram Singh" },
    { label: "Amit Sharma", value: "Amit Sharma" },
    { label: "Rajesh Kumar", value: "Rajesh Kumar" },
  ];
  const selectedDriverData = data.find((d) => d.driver === selectedDriver);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      {header()}
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        {driverSelection()}
        {divider()}
        {tabNavigation()}
        {renderBookingData()}
      </ScrollView>
    </View>
  );
  function driverSelection() {
    return (
      <View style={styles.driverSelectionContainer}>
        <SelectDropdown
          data={driverList}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.value, index);
            setSelectedDriver(selectedItem.value);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedDriver) || "Select Driver"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <FontAwesome6
          name="arrow-left"
          size={20}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          Bookings
        </Text>
      </View>
    );
  }
  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
    );
  }
  function tabNavigation() {
    return (
      <View style={styles.tabContainer}>
        {[
          { key: "past", label: "Past data" },
          { key: "future", label: "Future data" },
          { key: "accepted", label: "Accepted data" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  function renderBookingData() {
    if (!selectedDriverData) {
      return (
        <Text style={styles.noDataText}>Select a driver to view bookings</Text>
      );
    }

    let bookings;
    switch (activeTab) {
      case "past":
        bookings = selectedDriverData.pastBooking;
        break;
      case "future":
        bookings = selectedDriverData.futureBooking;
        break;
      case "accepted":
        bookings = selectedDriverData.acceptedBooking;
        break;
      default:
        bookings = [];
    }

    return (
      <View style={styles.bookingContainer}>
        {bookings.length === 0 ? (
          <Text style={styles.noDataText}>No bookings available</Text>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <Text>{booking.details}</Text>
            </View>
          ))
        )}
      </View>
    );
  }
};

export default BookingScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    margin: Sizes.fixPadding * 2,
  },
  headerTitle: {
    flex: 1,
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor20ExtraBold,
  },
  driverSelectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Sizes.fixPadding,
  },
  driverButton: {
    padding: Sizes.fixPadding,
    margin: Sizes.fixPadding / 2,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    borderRadius: Sizes.fixPadding,
  },
  selectedDriver: {
    backgroundColor: Colors.primaryColor,
  },
  driverText: {
    ...Fonts.blackColor16Bold,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.lightGrayColor,
    paddingVertical: Sizes.fixPadding,
  },
  tabButton: {
    padding: Sizes.fixPadding,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryColor,
  },
  tabText: {
    ...Fonts.blackColor16Bold,
  },
  bookingContainer: {
    padding: Sizes.fixPadding,
  },
  noDataText: {
    textAlign: "center",
    ...Fonts.grayColor16SemiBold,
  },
  bookingCard: {
    backgroundColor: Colors.whiteColor,
    padding: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding / 2,
    borderRadius: Sizes.fixPadding,
    shadowColor: Colors.blackColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dropdownButtonStyle: {
    height: 50.0,
    ...Fonts.blackColor16Bold,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    padding: 0,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E24",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
