import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const SecurityDepositScreen = () => {
  const navigation = useNavigation();
  const [securityAmt, setSecurityAmt] = useState("");
  const [securityDate, setSecurityDate] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: Sizes.fixPadding * 2 }}>
            <Text style={{ ...Fonts.grayColor15SemiBold, marginTop: 10 }}>
              Security Amount Deposit
            </Text>
            <TextInput
              value={securityAmt}
              onChangeText={(value) => setSecurityAmt(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Enter Security Amount Deposit"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
            <Text style={{ ...Fonts.grayColor15SemiBold, marginTop: 10 }}>
              Date of Deposit
            </Text>
            <TextInput
              value={securityDate}
              onChangeText={(value) => setSecurityDate(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Enter Security Deposit Date"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
            <Text style={{ ...Fonts.grayColor15SemiBold, marginTop: 10 }}>
              Validated from GMC Team
            </Text>
            <TextInput
              value={isValidated}
              onChangeText={(value) => setIsValidated(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Enter Is Validated"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.pop();
          }}
          style={styles.buttonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Save Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
    );
  }

  // Header Component
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
          Security Deposit
        </Text>
      </View>
    );
  }
};

export default SecurityDepositScreen;
const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  textFieldStyle: {
    height: 20.0,
    ...Fonts.blackColor16Bold,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    padding: 0,
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
