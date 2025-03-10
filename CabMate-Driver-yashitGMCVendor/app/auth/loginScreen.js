import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors, Fonts, Sizes, screenHeight } from "../../constants/styles";
import IntlPhoneInput from "react-native-intl-phone-input";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const LoginScreen = () => {
  const navigation = useNavigation();

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "flex-end", flexGrow: 1 }}
        >
          {loginImage()}
          {welcomeInfo()}
          {mobileNumberInfo()}
        </ScrollView>
        {continueButton()}
        {registerButton()}
      </View>
      {exitInfo()}
    </View>
  );

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("auth/verificationScreen");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }
  function registerButton() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          // marginTop: Sizes.fixPadding * 4.0,
          marginBottom: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.push("auth/registerScreen");
          }}
        >
          <Text style={{ ...Fonts.primaryColor15Bold }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={styles.exitInfoWrapStyle}>
        <Text style={{ ...Fonts.whiteColor15SemiBold }}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }

  function mobileNumberInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <IntlPhoneInput
          onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
          defaultCountry="IN"
          containerStyle={{ backgroundColor: Colors.whiteColor }}
          placeholder={"Enter Your Number"}
          placeholderTextColor={Colors.grayColor}
          phoneInputStyle={styles.phoneInputStyle}
          dialCodeTextStyle={{
            ...Fonts.blackColor15Bold,
            marginHorizontal: Sizes.fixPadding - 2.0,
          }}
          modalCountryItemCountryNameStyle={{ ...Fonts.blackColor16Bold }}
          flagStyle={{ fontSize: 30 }}
          inputProps={{ selectionColor: Colors.primaryColor }}
        />
      </View>
    );
  }

  function welcomeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 4.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor20Bold }}>Welcome to GetMe Cab</Text>
        <Text
          style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold }}
        >
          Enter your phone number to continue
        </Text>
      </View>
    );
  }

  function loginImage() {
    return (
      <Image
        source={require("../../assets/images/login.png")}
        style={{
          width: "100%",
          height: screenHeight / 3.0,
          resizeMode: "stretch",
        }}
      />
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  phoneInputStyle: {
    flex: 1,
    ...Fonts.blackColor15Bold,
    borderBottomColor: Colors.shadowColor,
    borderBottomWidth: 1.0,
    padding: 0,
  },
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
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
});
