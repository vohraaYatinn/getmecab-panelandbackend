import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, commonStyles, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "expo-router";
import * as Location from "expo-location";
const HelpSupportScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginVertical: Sizes.fixPadding }}></View>
          {callOption("1234567890", "Manish Verma ")}
          {callOption("1234567891", "Satish Verma ")}
          <View style={{ marginVertical: Sizes.fixPadding }}></View>
          {messageOption("1234567890", "Manish Verma ")}
          {messageOption("1234567891", "Satish Verma ")}
          <View style={{ marginVertical: Sizes.fixPadding }}></View>
          {emailOption("manish@gmail.com", "Manish Verma")}
          {emailOption("satish@gmail.com", "Satish Verma ")}
          <View style={{ marginVertical: Sizes.fixPadding }}></View>
          {mapOption("Taj Mahal, Agra, Uttar Pradesh, India", "Agra Office")}
          {mapOption(
            "Gateway of India, Mumbai, Maharashtra, India",
            "Mumbai Office "
          )}
          <View style={{ marginVertical: Sizes.fixPadding }}></View>
        </ScrollView>
      </View>
    </View>
  );

  async function getDirections(addressTo) {
    try {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Construct Google Maps directions URL
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(
        addressTo
      )}&travelmode=driving`;

      // Open Google Maps with directions
      Linking.openURL(directionsUrl).catch((err) =>
        console.error("An error occurred", err)
      );
    } catch (error) {
      console.error("Error fetching location", error);
    }
  }

  function mapOption(addressTo, userName) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => getDirections(addressTo)}
        style={styles.ridesInfoWrapStyle}
      >
        <View style={styles.rideTimeAndAmountWrapStyle}>
          <View
            style={{
              width: 25.0,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="directions"
              size={24}
              color={Colors.blackColor}
            />
          </View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor20Bold,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  function emailOption(emailTo, userName) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          const emailUrl = `mailto:${emailTo}?subject=Hello ${userName}&body=Hi ${userName},`;
          Linking.openURL(emailUrl).catch((err) =>
            console.error("An error occurred", err)
          );
        }}
        style={styles.ridesInfoWrapStyle}
      >
        <View style={styles.rideTimeAndAmountWrapStyle}>
          <View
            style={{
              width: 25.0,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="email" size={24} color={Colors.blackColor} />
          </View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor20Bold,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function callOption(callTo, userName) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          const callUrl = `tel:${callTo}`;
          Linking.openURL(callUrl).catch((err) =>
            console.error("An error occurred", err)
          );
        }}
        style={styles.ridesInfoWrapStyle}
      >
        <View style={styles.rideTimeAndAmountWrapStyle}>
          <View
            style={{
              width: 25.0,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="phone" size={24} color={Colors.blackColor} />
          </View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor20Bold,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function messageOption(phoneNumber, userName) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          const smsUrl = `sms:${phoneNumber}?body=Hi ${userName},`;
          Linking.openURL(smsUrl).catch((err) =>
            console.error("An error occurred", err)
          );
        }}
        style={styles.ridesInfoWrapStyle}
      >
        <View style={styles.rideTimeAndAmountWrapStyle}>
          <View
            style={{
              width: 25.0,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="message" size={24} color={Colors.blackColor} />
          </View>
          <View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor20Bold,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
          Help & Support
        </Text>
      </View>
    );
  }
};

export default HelpSupportScreen;

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
    // marginBottom: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
});
