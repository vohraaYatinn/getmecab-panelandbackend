import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MyStatusBar from "../../components/myStatusBar";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { bookingData } from "../../assets/jsonFiles/bookings.json";
import ShareApp from "../../components/ShareButton";
const NewBookingFormScreen = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
          {bookingData?.map((booking, idx) => (
            <React.Fragment key={idx}>{newBookingInfo(booking)}</React.Fragment>
          ))}
        </ScrollView>
        {loadingDialog()}
      </View>
    </View>
  );

  //   dynamic form field
  function newBookingInfo(booking) {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={styles.container}>
          {/* Booking ID & Share Icon */}
          <View style={styles.headerRow}>
            <Text style={styles.bookingId}>
              B2B-2025-3165 -{" "}
              <Text style={styles.tripType}>{booking?.tripType}</Text>
            </Text>
            <ShareApp booking={booking} />
          </View>

          {/* Locations */}
          <View style={styles.locationContainer}>
            <View style={styles.locationRow}>
              <FontAwesome
                name="map-marker"
                size={16}
                color={Colors.blackColor}
              />
              <Text style={styles.locationText}>{booking?.pickUpAddress}</Text>
            </View>
            <View style={styles.locationRow}>
              <FontAwesome
                name="map-marker"
                size={16}
                color={Colors.blackColor}
              />
              <Text style={styles.locationText}>{booking?.dropAddress}</Text>
            </View>
          </View>

          {/* Vehicle Info */}
          <Text style={styles.vehicleInfo}>{booking?.vehicle}</Text>

          {/* Start Trip Details */}
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={Colors.blackColor} />
            <Text style={styles.infoText}>
              Start Trip: {booking?.startDate} | {booking?.startTime}
            </Text>
          </View>

          {/* Parking, Toll & Tax */}
          <View style={styles.infoGroup}>
            {infoBox(
              "car-outline",
              "Parking",
              booking?.carrier,
              Colors.blackColor
            )}
            {infoBox("cash-outline", "Toll", booking?.toll, Colors.blackColor)}
            {infoBox("receipt-outline", "Tax", booking?.tax, Colors.blackColor)}
          </View>

          {/* Cash Collect & Vendor Amount */}
          <Text style={styles.cashCollect}>
            Cash Collect: Rs. {booking?.totalCollections}
          </Text>
          <Text style={styles.vendorAmount}>
            Vendor Amount: Rs. {booking?.commission}
          </Text>

          {/* Accept Booking Button */}
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
              }, 3000);
            }}
          >
            <Text style={styles.buttonText}>
              Accept Booking @ Commission Rs. {booking?.commission}
            </Text>
          </TouchableOpacity>
        </View>
        {divider()}
      </View>
    );
  }

  function infoBox(icon, title, value, color = Colors.blackColor) {
    return (
      <View style={styles.infoBox}>
        <Ionicons name={icon} size={20} color={Colors.blackColor} />
        <Text style={styles.infoBoxTitle}>{title}</Text>
        <Text style={[styles.infoBoxValue, { color }]}>{value}</Text>
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
          onPress={() => router.push("drawer/home/homeScreen")}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          New Booking
        </Text>
      </View>
    );
  }
};

export default NewBookingFormScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  container: {
    marginHorizontal: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Sizes.fixPadding,
  },

  bookingId: {
    ...Fonts.primaryColor18Bold,
  },
  tripType: {
    color: Colors.yellowColor,
  },
  locationContainer: {
    marginBottom: Sizes.fixPadding,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    marginLeft: Sizes.fixPadding,
    color: Colors.grayColor,
    ...Fonts.blackColor14SemiBold,
  },
  vehicleInfo: {
    color: Colors.redColor,
    ...Fonts.blackColor16Bold,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Sizes.fixPadding,
  },
  infoText: {
    marginLeft: Sizes.fixPadding,
    color: Colors.grayColor,
    ...Fonts.blackColor14SemiBold,
  },
  infoGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Sizes.fixPadding * 1.5,
  },
  infoBox: {
    alignItems: "center",
  },
  infoBoxTitle: {
    color: Colors.grayColor,
    ...Fonts.blackColor14SemiBold,
  },
  infoBoxValue: {
    ...Fonts.blackColor16Bold,
  },
  cashCollect: {
    textAlign: "center",
    color: Colors.blackColor,
    ...Fonts.blackColor18Bold,
  },
  vendorAmount: {
    textAlign: "center",
    color: Colors.primaryColor,
    ...Fonts.blackColor20ExtraBold,
    marginTop: Sizes.fixPadding,
  },
  acceptButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding * 1.2,
    borderRadius: 30,
    marginTop: Sizes.fixPadding * 2,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.whiteColor,
    ...Fonts.whiteColor16Bold,
  },
});
