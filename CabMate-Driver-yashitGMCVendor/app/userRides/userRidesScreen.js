import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";

const driverList = [
  { label: "Select Driver", value: "" },
  { label: "Arun Verma", value: "Arun Verma" },
  { label: "Suresh Yadav", value: "Suresh Yadav" },
  { label: "Vikram Singh", value: "Vikram Singh" },
  { label: "Amit Sharma", value: "Amit Sharma" },
  { label: "Rajesh Kumar", value: "Rajesh Kumar" },
];

const userRidesList = [
  {
    id: "1",
    passengerName: "Amit Sharma",
    date: "Today",
    time: "01:17 pm",
    amount: "₹250",
    pickupAddress: "Connaught Place, New Delhi",
    dropAddress: "Cyber Hub, Gurugram, Haryana",
    driverName: "Arun Verma",
  },
  {
    id: "2",
    passengerName: "Priya Mehta",
    date: "Fri 09 Feb, 2024",
    time: "08:45 am",
    amount: "₹180",
    pickupAddress: "Marine Drive, Mumbai",
    dropAddress: "Bandra Kurla Complex, Mumbai",
    driverName: "Suresh Yadav",
  },
  {
    id: "3",
    passengerName: "Rahul Verma",
    date: "Thu 08 Feb, 2024",
    time: "07:30 pm",
    amount: "₹320",
    pickupAddress: "MG Road, Bengaluru",
    dropAddress: "Electronic City, Bengaluru",
    driverName: "Vikram Singh",
  },
  {
    id: "4",
    passengerName: "Neha Kapoor",
    date: "Wed 07 Feb, 2024",
    time: "06:15 am",
    amount: "₹275",
    pickupAddress: "Park Street, Kolkata",
    dropAddress: "Salt Lake Sector V, Kolkata",
    driverName: "Amit Sharma",
  },
  {
    id: "5",
    passengerName: "Vikram Singh",
    date: "Tue 06 Feb, 2024",
    time: "09:10 am",
    amount: "₹150",
    pickupAddress: "Charminar, Hyderabad",
    dropAddress: "Hi-Tech City, Hyderabad",
    driverName: "Rajesh Kumar",
  },
  {
    id: "6",
    passengerName: "Ananya Iyer",
    date: "Mon 05 Feb, 2024",
    time: "05:45 pm",
    amount: "₹220",
    pickupAddress: "Anna Nagar, Chennai",
    dropAddress: "Tidel Park, Chennai",
    driverName: "Arun Verma",
  },
];

const UserRidesScreen = () => {
  const navigation = useNavigation();
  const [selectedDriver, setSelectedDriver] = useState("");
  const selectedDriverData = userRidesList.find(
    (d) => d.driverName === selectedDriver
  );

  const filteredRides = selectedDriver
    ? userRidesList.filter((ride) => ride.driverName === selectedDriver)
    : userRidesList;

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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {driverSelection()}
        {userRides()}
      </View>
    </View>
  );

  function userRides() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("rideDetail/rideDetailScreen");
        }}
        style={styles.ridesInfoWrapStyle}
      >
        <View style={styles.rideTimeAndAmountWrapStyle}>
          <Image
            source={require("../../assets/images/users/user6.png")}
            style={{ width: 55.0, height: 55.0, borderRadius: 27.5 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  marginRight: Sizes.fixPadding,
                  ...Fonts.blackColor16SemiBold,
                }}
              >
                {item.date} {item.time}
              </Text>
              <Text style={{ ...Fonts.primaryColor16Bold }}>{item.amount}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 7.0,
                  ...Fonts.grayColor14SemiBold,
                }}
              >
                {item.passengerName}
              </Text>
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 7.0,
                  ...Fonts.grayColor14SemiBold,
                }}
              >
                By: {item.driverName}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 24, alignItems: "center" }}>
            <View style={styles.currentLocationIconStyle}>
              <View
                style={{
                  width: 7.0,
                  height: 7.0,
                  borderRadius: 3.5,
                  backgroundColor: Colors.blackColor,
                }}
              />
            </View>
          </View>
          <Text
            numberOfLines={1}
            style={{
              marginLeft: Sizes.fixPadding + 5.0,
              flex: 1,
              ...Fonts.blackColor15SemiBold,
            }}
          >
            {item.pickupAddress}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 24.0, alignItems: "center" }}>
            <Text style={{ ...Fonts.blackColor8SemiBold, lineHeight: 6 }}>
              •{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•
            </Text>
          </View>
          <View style={styles.currentToDropLocationInfoDividerStyle} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: -(Sizes.fixPadding - 5.0),
          }}
        >
          <View style={{ width: 24.0, alignItems: "center" }}>
            <MaterialIcons
              name="location-pin"
              size={24}
              color={Colors.primaryColor}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor15SemiBold,
            }}
          >
            {item.dropAddress}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={filteredRides}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: Sizes.fixPadding,
          paddingBottom: Sizes.fixPadding - 5.0,
        }}
        showsVerticalScrollIndicator={false}
      />
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
          Rides
        </Text>
      </View>
    );
  }
};

export default UserRidesScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  currentToDropLocationInfoDividerStyle: {
    backgroundColor: Colors.shadowColor,
    height: 1.0,
    flex: 1,
    marginRight: Sizes.fixPadding * 2.5,
    marginLeft: Sizes.fixPadding,
  },
  currentLocationIconStyle: {
    width: 18.0,
    height: 18.0,
    borderRadius: 9.0,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.blackColor,
    borderWidth: 2.0,
  },
  ridesInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    ...commonStyles.shadow,
  },
  rideTimeAndAmountWrapStyle: {
    marginBottom: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
