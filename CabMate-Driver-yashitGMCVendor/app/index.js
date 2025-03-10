import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { Colors, Fonts, Sizes } from "../constants/styles";
import MyStatusBar from "../components/myStatusBar";
import { useNavigation } from "expo-router";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push("auth/loginScreen");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {appIcon()}
        {appName()}
      </View>
      <Text
        style={{
          textAlign: "center",
          margin: Sizes.fixPadding * 2.0,
          ...Fonts.grayColor12SemiBold,
        }}
      >
        VENDOR APP
      </Text>
    </View>
  );

  function appName() {
    return (
      <Text
        style={{
          marginTop: Sizes.fixPadding,
          letterSpacing: 3.0,
          ...Fonts.primaryColor24RasaBold,
        }}
      ></Text>
    );
  }

  function appIcon() {
    return (
      <Image
        source={require("../assets/images/icon.jpeg")}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
      />
    );
  }
};

export default SplashScreen;
