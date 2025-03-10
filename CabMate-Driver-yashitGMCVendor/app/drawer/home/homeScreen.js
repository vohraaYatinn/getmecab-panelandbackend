import {
  StyleSheet,
  BackHandler,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import React, { useState, useCallback, useEffect } from "react";
import { Colors, commonStyles, Fonts, Sizes } from "../../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../../components/myStatusBar";
import { useNavigation } from "expo-router";
import NewB from "../../../assets/images/new_b.jpg";
import AcceptB from "../../../assets/images/accept_b.jpg";
import PostB from "../../../assets/images/post_b.png";
import CompB from "../../../assets/images/compl_b.jpg";
import driver from "../../../assets/images/driver.png";
import vehicle from "../../../assets/images/taxi.png";
import users from "../../../assets/images/user.png";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );
  const DATA = [
    { title: "New Booking", image: NewB, url: "bookings/newBookingScreen" },
    {
      title: "Upcoming Booking",
      image: AcceptB,
      url: "bookings/acceptBookingScreen",
    },
    {
      title: "Complete Booking",
      image: CompB,
      url: "bookings/completedBookingScreen",
    },
    { title: "Post Booking", image: PostB, url: "bookings/bookingFormScreen" },
    {
      title: "All Vehicles",
      image: vehicle,
      url: "vehicle/vehiclesScreen",
    },
    { title: "All Drivers", image: driver, url: "driver/driversScreen" },
    { title: "All Rides", image: users, url: "userRides/userRidesScreen" },
  ];
  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(item.url);
      }}
      style={styles.card}
    >
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={styles.onlineOffLineInfoWithIconsOuterWrapStyle}>
        <View style={styles.currentLocationWithIconWrapStyle}>
          <MaterialIcons
            name="menu"
            size={20}
            color={Colors.blackColor}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              // borderWidth: 2,
              backgroundColor: Colors.primaryColor,

              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate("bookings/bookingFormScreen");
            }}
          >
            <Text
              style={{
                // color: Colors.whiteColor,
                ...Fonts.whiteColor16Bold,
              }}
            >
              Post Booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 100,
        }}
      ></View>
      <FlatList
        data={DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: Sizes.fixPadding * 2.0,
          flexGrow: 1, // Ensures it fills the space
        }}
        columnWrapperStyle={{
          justifyContent: "space-between", // Aligns items evenly in each row
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  exitInfoWrapStyle: {
    backgroundColor: Colors.lightBlackColor,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  currentLocationWithIconWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding + 3.0,
    paddingVertical: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    elevation: 2.0,
    ...commonStyles.shadow,
    alignItems: "center",
  },
  currentLocationIconWrapStyle: {
    bottom: 20.0,
    right: 20.0,
    position: "absolute",
    borderRadius: 20.0,
    width: 40.0,
    height: 40.0,
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineOfflineIndicatorStyle: {
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
  },
  ridesInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBlackColor,
    borderRadius: Sizes.fixPadding - 5.0,
    position: "absolute",
    left: 20.0,
    right: 20.0,
    top: 95.0,
    padding: Sizes.fixPadding,
  },
  onlineOffLineInfoWithIconsOuterWrapStyle: {
    position: "absolute",
    left: 0.0,
    right: 0.0,
    zIndex: 1,
  },
  rowAlignCenterStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  goOnlineButtonBgImageStyle: {
    width: 110.0,
    height: 110.0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80.0,
    alignSelf: "center",
  },
  walletInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    borderRadius: Sizes.fixPadding - 5.0,
    // marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5.0,
    ...commonStyles.shadow,
    // width: screenWidth / 2.0,
  },
  walletIconWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightBlackColor,
    elevation: 3.0,
  },
  rightArrowIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    alignItems: "center",
    justifyContent: "center",
  },
  infoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    padding: Sizes.fixPadding + 5.0,
  },

  card: {
    width: "48%", // Use 48% to allow two items in each row (with space between)
    marginBottom: Sizes.fixPadding,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding / 2, // Reduced margin to leave space between items
    minHeight: 75, // Ensure there's enough space for content
    elevation: 1.5,
  },
  cardTitle: {
    ...Fonts.blackColor16Bold,
    marginVertical: 10,
  },
  cardImage: {
    width: "100%", // Full width of the card
    height: 180, // Fixed height for images to maintain consistency
    borderRadius: 15, // Rounded corners for the image
  },
});
