import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
const ledgerData = [
  {
    id: 1,
    city: "Mumbai",
    openingBalance: "₹50,000",
    receivablePayable: "Payable",
    amountPaidReceived: "₹10,000",
    balanceAmount: "₹40,000",
  },
  {
    id: 2,
    city: "Delhi",
    openingBalance: "₹75,000",
    receivablePayable: "Receivable",
    amountPaidReceived: "₹20,000",
    balanceAmount: "₹95,000",
  },
  {
    id: 3,
    city: "Bangalore",
    openingBalance: "₹1,00,000",
    receivablePayable: "Payable",
    amountPaidReceived: "₹25,000",
    balanceAmount: "₹75,000",
  },
  {
    id: 4,
    city: "Hyderabad",
    openingBalance: "₹60,000",
    receivablePayable: "Receivable",
    amountPaidReceived: "₹15,000",
    balanceAmount: "₹75,000",
  },
  {
    id: 5,
    city: "Chennai",
    openingBalance: "₹80,000",
    receivablePayable: "Payable",
    amountPaidReceived: "₹30,000",
    balanceAmount: "₹50,000",
  },
  {
    id: 6,
    city: "Kolkata",
    openingBalance: "₹45,000",
    receivablePayable: "Receivable",
    amountPaidReceived: "₹10,000",
    balanceAmount: "₹55,000",
  },
  {
    id: 7,
    city: "Pune",
    openingBalance: "₹90,000",
    receivablePayable: "Payable",
    amountPaidReceived: "₹40,000",
    balanceAmount: "₹50,000",
  },
  {
    id: 8,
    city: "Ahmedabad",
    openingBalance: "₹70,000",
    receivablePayable: "Receivable",
    amountPaidReceived: "₹25,000",
    balanceAmount: "₹95,000",
  },
  {
    id: 9,
    city: "Jaipur",
    openingBalance: "₹55,000",
    receivablePayable: "Payable",
    amountPaidReceived: "₹20,000",
    balanceAmount: "₹35,000",
  },
  {
    id: 10,
    city: "Lucknow",
    openingBalance: "₹65,000",
    receivablePayable: "Receivable",
    amountPaidReceived: "₹15,000",
    balanceAmount: "₹80,000",
  },
];

const VendorLedgerScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {addNewLeger()}
        {/* <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
        </ScrollView> */}
        {allLedgerInfo()}
      </View>
    </View>
  );

  function addNewLeger() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("vendorLedger/addLedgerScreen");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add New Ledger</Text>
      </TouchableOpacity>
    );
  }

  function allLedgerInfo() {
    const renderItem = ({ item, index }) => (
      <View style={{ paddingHorizontal: Sizes.fixPadding * 2 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              ...Fonts.blackColor16SemiBold,
              backgroundColor: Colors.primaryColor,
              padding: 5.5,
              borderRadius: 5.0,
            }}
          >
            {item.id}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                OB: {item.openingBalance}, APR: {item.amountPaidReceived}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                {item.balanceAmount}
              </Text>
            </View>
          </View>
        </View>
        {index == ledgerData.length - 1 ? null : (
          <View
            style={{
              backgroundColor: Colors.shadowColor,
              height: 1.0,
              marginVertical: Sizes.fixPadding + 5.0,
            }}
          />
        )}
      </View>
    );
    return (
      <View style={{ flex: 1, marginTop: Sizes.fixPadding }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor18Bold,
          }}
        >
          All Ledgers
        </Text>
        <FlatList
          data={ledgerData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
          Vendor Ledger
        </Text>
      </View>
    );
  }
};

export default VendorLedgerScreen;

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
