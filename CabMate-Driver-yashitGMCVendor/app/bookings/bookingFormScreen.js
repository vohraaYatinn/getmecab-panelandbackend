import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const carrierList = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const tollList = [
  { label: "Included", value: "Included" },
  { label: "Not Included", value: "Not Included" },
];
const tripTypeList = [
  { label: "One Way Trip", value: "One Way Trip" },
  { label: "Round Trip", value: "Round Trip" },
  { label: "Local / Rental Trip", value: "Local / Rental Trip" },
];

const vehicleTypeList = [
  {
    label: "WAGONR, CELERIO, RITZ & SIMILIAR [AC] 4+1",
    value: "WAGONR, CELERIO, RITZ & SIMILIAR [AC] 4+1",
  },
  {
    label: "DZIRE, AURA, XCENT, SIMILIAR [AC] 4+1",
    value: "DZIRE, AURA, XCENT, SIMILIAR [AC] 4+1",
  },
  {
    label: "ERTIGA, KIA, CARENCE, SUV, SIMILIAR [AC] 6+1",
    value: "ERTIGA, KIA, CARENCE, SUV, SIMILIAR [AC] 6+1",
  },
  {
    label: "ASSURED TOYOTA INNOVA CRYSTA [AX] 6+1",
    value: "ASSURED TOYOTA INNOVA CRYSTA [AX] 6+1",
  },
  { label: "TEMPOO TRAVELLER [AC] 12+1", value: "TEMPOO TRAVELLER [AC] 12+1" },
];

const PostBookingFormScreen = () => {
  const navigation = useNavigation();
  const [postBooking, setPostBooking] = useState({
    customerName: "",
    phone: "",
    tripType: "",
    vehicle: "",
    pickUpAddress: "",
    dropAddress: "",
    startDate: "",
    startTime: "",
    totalKms: "",
    extraPrices: "",
    totalCollections: "",
    commission: "",
    carrier: "",
    toll: "",
    tax: "",
    driverAllowance: "",
    specialRequirements: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (fieldName, value) => {
    setPostBooking((prev) => ({ ...prev, [fieldName]: value }));
  };

  function postButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.pop();
          }, 2000);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Post</Text>
      </TouchableOpacity>
    );
  }

  function loadingDialog() {
    return (
      <Modal animationType="slide" transparent={true} visible={isLoading}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{ ...styles.dialogStyle, alignSelf: "center" }}
            >
              <ActivityIndicator
                size={56}
                color={Colors.primaryColor}
                style={{
                  alignSelf: "center",
                  transform: [{ scale: Platform.OS == "ios" ? 2 : 1 }],
                }}
              />
              <Text
                style={{
                  marginTop: Sizes.fixPadding * 2.0,
                  textAlign: "center",
                  ...Fonts.whiteColor14Regular,
                }}
              >
                Please wait...
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {/* {userRatings()} */}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {formField("customerName", "Customer Name")}
          {formField("phone", "Phone")}
          {dropDownField(
            "tripType",
            "Trip Type",
            tripTypeList,
            "Select Trip Type"
          )}
          {dropDownField(
            "vehicle",
            "Vehicle",
            vehicleTypeList,
            "Select Vehicle"
          )}
          {formField("pickUpAddress", "PickUp Address")}
          {formField("dropAddress", "Drop Address")}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              {formField("startDate", "Start Date")}
            </View>
            <View style={{ flex: 1 }}>
              {formField("startTime", "Start Time")}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              {formField("totalKms", "Total Kms")}
            </View>
            <View style={{ flex: 1 }}>
              {formField("extraPrices", "Extra Prices")}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              {formField("totalCollections", "Total Collect")}
            </View>
            <View style={{ flex: 1 }}>
              {formField("commission", "Commission")}
            </View>
          </View>
          {dropDownField("carrier", "Carrier", carrierList, "Select Carrier")}
          {dropDownField("toll", "Toll", tollList, "Select Toll")}
          {dropDownField("tax", "Tax", tollList, "Select Tax")}
          {dropDownField(
            "driverAllowance",
            "Driver Allowance",
            tollList,
            "Select Driver Allowance"
          )}
          {formField("specialRequirements", "Special Requirements")}
          {postButton()}
        </ScrollView>
        {loadingDialog()}
      </View>
    </View>
  );

  // dynamic form field
  function formField(fieldName, placeholder) {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>{placeholder}</Text>
        <TextInput
          value={postBooking[fieldName]}
          onChangeText={(text) => handleChange(fieldName, text)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          placeholder={placeholder}
        />
        {divider()}
      </View>
    );
  }
  function dropDownField(fieldName, placeholder, list, select) {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>{placeholder}</Text>
        <SelectDropdown
          data={list}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.value, index);
            handleChange(fieldName, selectedItem.value); // Correctly updates state
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {postBooking[fieldName] || select}{" "}
                  {/* Correctly fetches selected value */}
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
                key={index}
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        {divider()}
      </View>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
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
          Post Booking
        </Text>
      </View>
    );
  }
};

export default PostBookingFormScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  ratingWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding - 2.0,
    paddingVertical: Sizes.fixPadding - 7.0,
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
