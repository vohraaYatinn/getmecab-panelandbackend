import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  Colors,
  Fonts,
  Sizes,
  commonStyles,
  screenWidth,
} from "../../constants/styles";
import OTPField from "react-native-otp-field";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("+91 1236457890");
  const [otpInput, setotpInput] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [otpSend, setOtpSend] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          Forgot Password
        </Text>
      </View>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
    );
  }

  function phoneNumberInfo() {
    return (
      <>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        >
          <Text style={{ ...Fonts.grayColor15SemiBold }}>Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="phone-pad"
          />
          {divider()}
        </View>
      </>
    );
  }
  function dontReceiveInfo() {
    return (
      <Text style={{ textAlign: "center" }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Didn’t receive a code? {}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
            }, 3000);
          }}
        >
          <Text style={{ ...Fonts.primaryColor15Bold }}>Resend</Text>
        </TouchableOpacity>
      </Text>
    );
  }
  function sendOTP() {
    return (
      <Text style={{ textAlign: "center" }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Send Verification Code
        </Text>
        <TouchableOpacity
          onPress={() => {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              setOtpSend(true);
            }, 3000);
          }}
        >
          <Text style={{ ...Fonts.primaryColor15Bold }}>Send</Text>
        </TouchableOpacity>
      </Text>
    );
  }

  function otpFields() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <OTPField
          length={4}
          value={otpInput}
          onChange={(val) => {
            setotpInput(val);
            if (val.length == 4) {
              Keyboard.dismiss();
              setisLoading(true);
              setTimeout(() => {
                setisLoading(false);
                navigation.push("drawer");
              }, 2000);
            }
          }}
          textFieldStyle={{ ...styles.textFieldStyle }}
          containerStyle={{
            justifyContent: "center",
            marginVertical: Sizes.fixPadding * 4.0,
          }}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>{header()}</View>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {phoneNumberInfo()}
        {!otpSend ? sendOTP() : dontReceiveInfo()}
        {otpFields()}
        {verifyButton()}
        {passwordInfo()}
        {newPasswordInfo()}
        {confirmPasswordInfo()}
        {saveButton()}
      </ScrollView>
      {loadingDialog()}
    </View>
  );

  function passwordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Enter Old Password</Text>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }
  function newPasswordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Enter New Password</Text>
        <TextInput
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }
  function confirmPasswordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>
          Confirm New Password
        </Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          style={styles.textFieldStyle}
          selectionColor={Colors.primaryColor}
          cursorColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }
  function verifyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            // navigation.push("editProfile/editProfileScreen");
          }, 2000);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Verify</Text>
      </TouchableOpacity>
    );
  }
  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push("editProfile/editProfileScreen");
          }, 2000);
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function loadingDialog() {
    return (
      <Modal animationType="slide" transparent={true} visible={isLoading}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{ ...styles.dialogStyle }}
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
                  ...Fonts.grayColor14Regular,
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
};

export default ChangePasswordScreen;
