import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  screenHeight,
  screenWidth,
} from "../../constants/styles";
import MapViewDirections from "react-native-maps-directions";
import { Key } from "../../constants/key";
import MapView, { Marker, Callout } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import * as Animatable from "react-native-animatable";
import BottomSheet from "react-native-simple-bottom-sheet";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const RideDetailScreen = () => {
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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.shadowColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {directionInfo()}
        {header()}
        {routeInfoSheet()}
      </View>
    </View>
  );

  function routeInfoSheet() {
    return (
      <BottomSheet
        isOpen={false}
        sliderMinHeight={screenHeight / 2}
        sliderMaxHeight={screenHeight - 150.0}
        lineContainerStyle={{
          height: 0.0,
          marginVertical: Sizes.fixPadding + 10.0,
        }}
        lineStyle={styles.sheetIndicatorStyle}
        outerContentStyle={{ ...styles.bottomSheetWrapStyle }}
        wrapperStyle={{
          paddingTop: Sizes.fixPadding,
          paddingHorizontal: 0,
          shadowOpacity: 0.1,
        }}
      >
        {(onScrollEndDrag) => (
          <ScrollView
            onScrollEndDrag={onScrollEndDrag}
            contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
            showsVerticalScrollIndicator={false}
          >
            <Animatable.View
              animation="slideInUp"
              iterationCount={1}
              duration={1500}
            >
              {passengerInfo()}
              {divider()}
              {tripInfo()}
              {divider()}
              {paymentInfo()}
              {divider()}
              {otherInfo()}
            </Animatable.View>
          </ScrollView>
        )}
      </BottomSheet>
    );
  }

  function otherInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <Text
          style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18Bold }}
        >
          Other Info
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              marginRight: Sizes.fixPadding * 4.0,
              alignItems: "center",
            }}
          >
            <Text style={{ ...Fonts.grayColor14SemiBold }}>Payment via</Text>
            <Text style={{ ...Fonts.blackColor15Bold }}>Card</Text>
          </View>
          <View
            style={{
              marginRight: Sizes.fixPadding * 4.0,
              alignItems: "center",
            }}
          >
            <Text style={{ ...Fonts.grayColor14SemiBold }}>
              Ride Commission
            </Text>
            <Text style={{ ...Fonts.blackColor15Bold }}>₹30.50</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...Fonts.grayColor14SemiBold }}>Ride type</Text>
            <Text style={{ ...Fonts.blackColor15Bold }}>Mini</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  function paymentInfo() {
    return (
      <View>
        <View style={styles.paymentHeaderStyle}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Payments</Text>
          <Text style={{ ...Fonts.primaryColor14Bold }}>$30.50</Text>
        </View>
        <View style={styles.paymentMethodWrapStyle}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Image
              source={require("../../assets/images/paymentMethods/visa.png")}
              style={{ width: 40.0, height: 40.0, resizeMode: "contain" }}
            />
            <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
              <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                **** **** **56 7896
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.grayColor12SemiBold }}>
                Expires 04/25
              </Text>
            </View>
          </View>
          <View style={styles.selectedMethodIndicatorStyle}>
            <MaterialIcons name="check" color={Colors.whiteColor} size={14} />
          </View>
        </View>
      </View>
    );
  }

  function tripInfo() {
    return (
      <View>
        <View style={styles.tripRouteTitleWrapStyle}>
          <Text style={{ ...Fonts.blackColor18Bold }}>Trip Route</Text>
          <Text style={{ ...Fonts.primaryColor14Bold }}>10 km (15 min)</Text>
        </View>
        {currentLocationInfo()}
        {currentToDropLocDivider()}
        {dropLocationInfo()}
      </View>
    );
  }

  function dropLocationInfo() {
    return (
      <View style={styles.dropLocationInfoWrapStyle}>
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
          1655 Island Pkwy, Kamloops, BC V2B 6Y9
        </Text>
      </View>
    );
  }

  function currentToDropLocDivider() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: 24.0, alignItems: "center" }}>
          <Text style={{ ...Fonts.blackColor8SemiBold, lineHeight: 6 }}>
            •{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•{`\n`}•
          </Text>
        </View>
        <View style={styles.currentToDropLocationInfoDividerStyle} />
      </View>
    );
  }

  function currentLocationInfo() {
    return (
      <View style={styles.currentLocationInfoWrapStyle}>
        <View style={{ width: 24, alignItems: "center" }}>
          <View style={styles.currentLocationIconStyle}>
            <View style={styles.currentLocationInnerCircle} />
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
          9 Bailey Drive, Fredericton, NB E3B 5A3
        </Text>
      </View>
    );
  }

  function divider() {
    return <View style={styles.sheetDividerStyle} />;
  }

  function passengerInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        {passengerImage()}
        {passengerDetail()}
      </View>
    );
  }

  function passengerDetail() {
    return (
      <View style={{ marginTop: Sizes.fixPadding }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            textAlign: "center",
            ...Fonts.blackColor17SemiBold,
          }}
        >
          Tynisha Obey
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              maxWidth: screenWidth / 2.5,
              marginHorizontal: Sizes.fixPadding + 9.0,
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
              Ride Commission
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
              ₹220
            </Text>
          </View>
          <View
            style={{
              maxWidth: screenWidth / 2.5,
              marginHorizontal: Sizes.fixPadding + 9.0,
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
              Booked on
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
              Today, 01:27 pm
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function passengerImage() {
    return (
      <Image
        source={require("../../assets/images/users/user2.png")}
        style={styles.passengerImageStyle}
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
          style={{ alignSelf: "flex-start" }}
        />
      </View>
    );
  }

  function directionInfo() {
    const currentCabLocation = {
      latitude: 22.715024,
      longitude: 88.474119,
    };
    const userLocation = {
      latitude: 22.558488,
      longitude: 88.309215,
    };
    return (
      showMap && (
        <MapView
          region={{
            latitude: 22.483643,
            longitude: 88.37588,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          style={{ height: "100%" }}
          mapType="terrain"
          loadingEnabled
          loadingIndicatorColor={Colors.primaryColor}
        >
          {showMap && (
            <MapViewDirections
              origin={currentCabLocation}
              destination={userLocation}
              apikey={Key.apiKey}
              strokeColor={Colors.primaryColor}
              strokeWidth={3}
            />
          )}
          {showMap && (
            <Marker
              coordinate={currentCabLocation}
              title={
                Platform.OS == "ios"
                  ? null
                  : "10km | 1655 Island Pkwy, Kamloops, BC V2B 6Y9"
              }
            >
              <Image
                source={require("../../assets/images/icons/marker2.png")}
                style={{ width: 50.0, height: 50.0, resizeMode: "stretch" }}
              />
              {Platform.OS == "ios" && (
                <Callout>
                  <View style={styles.calloutWrapStyle}>
                    <View style={styles.kilometerInfoWrapStyle}>
                      <Text style={{ ...Fonts.whiteColor10Bold }}>10km</Text>
                    </View>
                    <Text
                      style={{
                        marginLeft: Sizes.fixPadding,
                        flex: 1,
                        ...Fonts.blackColor14SemiBold,
                      }}
                    >
                      1655 Island Pkwy, Kamloops, BC V2B 6Y9
                    </Text>
                  </View>
                </Callout>
              )}
            </Marker>
          )}
          {showMap && (
            <Marker
              coordinate={userLocation}
              title={
                Platform.OS == "ios"
                  ? null
                  : "9 Bailey Drive, Fredericton, NB E3B 5A3"
              }
            >
              <Image
                source={require("../../assets/images/icons/marker3.png")}
                style={{ width: 23.0, height: 23.0 }}
              />
              {Platform.OS == "ios" && (
                <Callout>
                  <Text
                    style={{
                      width: screenWidth / 1.5,
                      ...Fonts.blackColor14SemiBold,
                    }}
                  >
                    9 Bailey Drive, Fredericton, NB E3B 5A3
                  </Text>
                </Callout>
              )}
            </Marker>
          )}
        </MapView>
      )
    );
  }
};

export default RideDetailScreen;

const styles = StyleSheet.create({
  currentLocationInfoWrapStyle: {
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  dropLocationInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -(Sizes.fixPadding - 5.0),
  },
  headerWrapStyle: {
    position: "absolute",
    top: 20.0,
    left: 15.0,
    right: 15.0,
  },
  calloutWrapStyle: {
    width: screenWidth / 1.5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
  },
  kilometerInfoWrapStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.lightBlackColor,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding - 5.0,
  },
  bottomSheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    paddingTop: Platform.OS == "ios" ? Sizes.fixPadding : 0,
  },
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: "center",
    marginVertical: Sizes.fixPadding * 2.0,
  },
  ratingInfoWrapStyle: {
    position: "absolute",
    bottom: 5.0,
    flexDirection: "row",
    alignItems: "center",
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
  currentLocationInnerCircle: {
    width: 7.0,
    height: 7.0,
    borderRadius: 3.5,
    backgroundColor: Colors.blackColor,
  },
  tripRouteTitleWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedMethodIndicatorStyle: {
    width: 20.0,
    height: 20.0,
    borderRadius: 10.0,
    backgroundColor: Colors.lightBlackColor,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentMethodWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    padding: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
  },
  paymentHeaderStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetDividerStyle: {
    height: 1.0,
    backgroundColor: Colors.shadowColor,
    marginVertical: Sizes.fixPadding * 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passengerImageStyle: {
    width: screenWidth / 4.0,
    height: screenWidth / 4.0,
    borderRadius: screenWidth / 4.0 / 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignSelf: "center",
  },
});
