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

const addVendorLedgerScreen = () => {
  const navigation = useNavigation();
  const [openingBalance, setOpeningBalance] = useState("");
  const [receivablePayable, setReceivablePayable] = useState("");
  const [amountPaidReceived, setAmountPaidReceived] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");

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
            {renderInput("Opening Balance", openingBalance, setOpeningBalance)}
            {divider()}
            {renderInput(
              "Receivable/Payable of the trip",
              receivablePayable,
              setReceivablePayable
            )}
            {divider()}
            {renderInput(
              "Amount Paid/Recd by/from GMC",
              amountPaidReceived,
              setAmountPaidReceived
            )}
            {divider()}
            {renderInput("Balance Amount", balanceAmount, setBalanceAmount)}
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
          <Text style={{ ...Fonts.whiteColor18Bold }}>Save Ledger</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function renderInput(label, value, setValue) {
    return (
      <>
        <Text style={{ ...Fonts.grayColor15SemiBold, marginTop: 10 }}>
          {label}
        </Text>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          placeholder={`Enter ${label}`}
          placeholderTextColor={Colors.lightGrayColor}
        />
      </>
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
          onPress={() => navigation.pop()}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding + 2.0,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          Add New Ledger
        </Text>
      </View>
    );
  }
};

export default addVendorLedgerScreen;

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
