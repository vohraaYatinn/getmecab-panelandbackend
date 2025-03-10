import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard,
  Modal
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Fonts, Sizes, screenWidth } from '../../constants/styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import OTPField from 'react-native-otp-field';
import MyStatusBar from '../../components/myStatusBar';
import { useNavigation } from 'expo-router';

const VerificationScreen = () => {

  const navigation = useNavigation();

  const [otpInput, setotpInput] = useState('');
  const [isLoading, setisLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
          {enterCodeInfo()}
          {otpFields()}
          {dontReceiveInfo()}
        </ScrollView>
      </View>
      {continueButton()}
      {loadingDialog()}
    </View>
  );

  function loadingDialog() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { }}
              style={{ ...styles.dialogStyle, alignSelf: 'center' }}
            >
              <ActivityIndicator
                size={56}
                color={Colors.primaryColor}
                style={{ alignSelf: 'center', transform: [{ scale: Platform.OS == 'ios' ? 2 : 1 }] }}
              />
              <Text
                style={{
                  marginTop: Sizes.fixPadding * 2.0,
                  textAlign: 'center',
                  ...Fonts.grayColor14Regular,
                }}>
                Please wait...
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setisLoading(true);
          setTimeout(() => {
            setisLoading(false);
            navigation.push('drawer');
          }, 2000);
        }}
        style={styles.buttonStyle}>
        <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function dontReceiveInfo() {
    return (
      <Text style={{ textAlign: 'center' }}>
        <Text style={{ ...Fonts.grayColor14Regular }}>
          Didn’t receive a code? { }
        </Text>
        <Text style={{ ...Fonts.primaryColor15Bold }}>Resend</Text>
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
                navigation.push('drawer');
              }, 2000);
            }
          }}
          textFieldStyle={{ ...styles.textFieldStyle }}
          containerStyle={{
            justifyContent: 'center',
            marginVertical: Sizes.fixPadding * 4.0,
          }}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
      </View>
    );
  }

  function enterCodeInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}>
        <Text style={{ textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
          Enter Verification Code
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: Sizes.fixPadding,
            ...Fonts.grayColor15SemiBold,
          }}>
          A 4 digit code has sent to your phone number
        </Text>
      </View>
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
          }}>
          Verification
        </Text>
      </View>
    );
  }
};

export default VerificationScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  textFieldStyle: {
    borderRadius: Sizes.fixPadding - 5.0,
    borderWidth: 0,
    borderBottomWidth: 4.0,
    borderBottomColor: Colors.shadowColor,
    width: screenWidth / 8.0,
    height: screenWidth / 8.0,
    marginHorizontal: Sizes.fixPadding - 5.0,
    ...Fonts.blackColor16Bold,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  dialogStyle: {
    width: '80%',
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding + 5.0,
    paddingTop: Sizes.fixPadding * 2.0,
    elevation: 3.0,
  },
});
