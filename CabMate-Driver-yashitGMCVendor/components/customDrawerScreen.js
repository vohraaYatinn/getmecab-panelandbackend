import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import {
  Colors,
  Fonts,
  Sizes,
  screenWidth,
  screenHeight,
  commonStyles,
} from "../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Svg, { Path } from "react-native-svg";
import * as shape from "d3-shape";
import {
  useDrawerStatus,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useNavigation } from "expo-router";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const height = screenWidth / 7.0;
const tabWidth = screenWidth / 3.5;

const getPath = () => {
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: screenWidth, y: 0 },
    { x: screenWidth + 5, y: 2 },
    { x: screenWidth + 10, y: 8 },
    { x: screenWidth + 15, y: 15 },
    { x: screenWidth + 20, y: height },
    { x: screenWidth + tabWidth - 20, y: height },
    { x: screenWidth + tabWidth - 15, y: 15 },
    { x: screenWidth + tabWidth - 10, y: 8 },
    { x: screenWidth + tabWidth - 5, y: 2 },
    { x: screenWidth + tabWidth, y: 0 },
  ]);
  return `${tab}`;
};

const d = getPath();

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const value = useRef(new Animated.Value(0)).current;

  const translateX = value.interpolate({
    inputRange: [0, screenWidth],
    outputRange: [-screenWidth, 0],
  });

  return (
    <View style={styles.drawerWrapStyle}>
      {header()}
      <DrawerContentScrollView
        contentContainerStyle={{
          flexGrow: 1,
          width: screenWidth - 90.0,
          paddingTop: 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, marginHorizontal: -12 }}>
          {drawerOptions()}
        </View>
      </DrawerContentScrollView>
      {closeIcon()}
      {logoutDialog()}
    </View>
  );

  function logoutDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogoutDialog}
        onRequestClose={() => {
          setShowLogoutDialog(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowLogoutDialog(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{ ...styles.dialogStyle, alignSelf: "center" }}
            >
              <View
                style={{
                  marginVertical: Sizes.fixPadding * 3.0,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="help"
                    size={22}
                    color={Colors.primaryColor}
                  />
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: Sizes.fixPadding,
                      ...Fonts.blackColor16SemiBold,
                    }}
                  >
                    Do You Want to Logout...?
                  </Text>
                </View>
                <View style={styles.cancelAndLogoutButtonWrapStyle}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowLogoutDialog(false);
                    }}
                    style={{
                      ...styles.cancelAndLogoutButtonStyle,
                      borderColor: Colors.lightGrayColor,
                      backgroundColor: Colors.whiteColor,
                    }}
                  >
                    <Text style={{ ...Fonts.grayColor16Bold }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowLogoutDialog(false);
                      navigation.push("auth/loginScreen");
                    }}
                    style={{
                      ...styles.cancelAndLogoutButtonStyle,
                      ...styles.logoutButtonStyle,
                    }}
                  >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function closeIcon() {
    return useDrawerStatus() === "open" ? (
      <View style={styles.curveWrapStyle}>
        <View
          {...{ height, screenWidth }}
          style={{ transform: [{ rotate: "-90deg" }], width: "100%" }}
        >
          <AnimatedSvg
            width={screenWidth * 2}
            {...{ height }}
            style={{ transform: [{ translateX }] }}
          >
            <Path d={d} fill={Colors.whiteColor} />
          </AnimatedSvg>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={styles.closeIconWrapStyle}
        >
          <MaterialIcons name="close" size={24} color={Colors.primaryColor} />
        </TouchableOpacity>
      </View>
    ) : null;
  }

  function drawerOptions() {
    return (
      <View>
        {drawerOptionSort({
          iconName: "dashboard",
          option: "Dashboard",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("drawer/home/homeScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "directions-car",
          option: "Rides",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("userRides/userRidesScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "post-add",
          option: "New Bookings",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("bookings/newBookingScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "check-circle",
          option: "Accept Booking",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("bookings/acceptBookingScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "done-all",
          option: "Completed Bookings",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("bookings/completedBookingScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "done-all",
          option: "Post Bookings",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("bookings/bookingFormScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "All Vehicles",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("vehicle/vehiclesScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "All Drivers",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("driver/driversScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "Wallet",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("wallet/walletScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "Payment History",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("wallet/walletScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "Redeem Money",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("wallet/walletScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "account-balance-wallet",
          option: "Redeem History",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("wallet/walletScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "card-giftcard", // More relevant for rewards
          option: "Rewards Policy",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("policies/rewardPolicyScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "gavel", // More relevant for penalty
          option: "Penalty Policy",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("policies/penaltyPolicyScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "description", // More relevant for Terms & Conditions
          option: "Terms & Conditions",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("policies/termsConditionScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "lock", // More relevant for Privacy Policy
          option: "Privacy Policy",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("policies/privacyPolicyScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "restore", // More relevant for Refund Policy
          option: "Refund Policy",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("policies/refundPolicyScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "support-agent", // More relevant for Help & Support
          option: "Help & Support",
          onPress: () => {
            props.navigation.closeDrawer();
            navigation.push("help&Support/help&SupportScreen");
          },
        })}
        {divider()}
        {drawerOptionSort({
          iconName: "logout",
          option: "Logout",
          onPress: () => {
            setShowLogoutDialog(true);
          },
        })}
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.lightGrayColor,
          height: 1.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      />
    );
  }

  function drawerOptionSort({ iconName, option, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          margin: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.drawerOptionIconWrapStyle}>
          <MaterialIcons name={iconName} size={17} color={Colors.whiteColor} />
        </View>
        <Text
          style={{
            flex: 1,
            ...Fonts.blackColor17Bold,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function header() {
    return (
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          borderTopRightRadius: Sizes.fixPadding * 2.0,
        }}
      >
        <SafeAreaView />
        <View style={styles.headerWrapStyle}>
          <View>
            <Image
              source={require("../assets/images/users/user1.png")}
              style={{
                width: screenWidth / 5.0,
                height: screenWidth / 5.0,
                borderRadius: screenWidth / 5.0 / 2.0,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                props.navigation.closeDrawer();
                navigation.push("editProfile/editProfileScreen");
              }}
              style={styles.profileEditIconWrapStyle}
            >
              <Feather
                name="edit-3"
                size={screenWidth / 25.0}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 8.0 }}>
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Bold }}>
              Raju Verma
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.whiteColor14Regular }}>
              vermaraju@gmail.com
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding * 3.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
  },
  profileEditIconWrapStyle: {
    width: screenWidth / 15.0,
    height: screenWidth / 15.0,
    borderRadius: screenWidth / 15.0 / 2.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -5.0,
  },
  closeIconWrapStyle: {
    width: screenWidth / 8.0,
    height: screenWidth / 8.0,
    borderRadius: screenWidth / 8.0 / 2.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    top: 2.0,
    right: 15.0,
    ...commonStyles.shadow,
  },
  curveWrapStyle: {
    top: screenHeight / 2.0 - StatusBar.currentHeight,
    height: screenWidth / 3.5,
    width: screenWidth / 7.0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    left: screenWidth - 90.3,
  },
  drawerOptionIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
  },
  dialogStyle: {
    width: "90%",
    backgroundColor: Colors.whiteColor,
    padding: 0.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  cancelAndLogoutButtonStyle: {
    paddingVertical: Sizes.fixPadding - 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 1,
  },
  cancelAndLogoutButtonWrapStyle: {
    marginTop: Sizes.fixPadding * 3.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutButtonStyle: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    marginLeft: Sizes.fixPadding,
  },
  drawerWrapStyle: {
    flex: 1,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    borderBottomRightRadius: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
  },
});

export default CustomDrawer;
