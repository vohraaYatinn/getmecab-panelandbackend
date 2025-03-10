import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const driversList = [
  {
    id: 1,
    name: "Rajesh Kumar",
    userImage: require("../../assets/images/users/driver1.jpg"),
    mno: "+91 9876543210",
    altno: "+91 9876504321",
    dlNo: "DL-0420110012345",
    ac: "SBI - 123456789012",
    pc: "110001",
    training: true,
  },
  {
    id: 2,
    name: "Amit Sharma",
    userImage: require("../../assets/images/users/driver2.png"),
    mno: "+91 9812345678",
    altno: "+91 9812308765",
    dlNo: "MH-0620130098765",
    ac: "HDFC - 987654321012",
    pc: "400001",
    training: true,
  },
  {
    id: 3,
    name: "Vikram Singh",
    userImage: require("../../assets/images/users/driver1.jpg"),
    mno: "+91 9988776655",
    altno: "+91 9988701234",
    dlNo: "UP-1020140045678",
    ac: "ICICI - 456789012345",
    pc: "226001",
    training: true,
  },
  {
    id: 4,
    name: "Suresh Yadav",
    userImage: require("../../assets/images/users/driver1.jpg"),
    mno: "+91 9123456789",
    altno: "+91 9123409876",
    dlNo: "RJ-0720150023456",
    ac: "AXIS - 345678901234",
    pc: "302001",
    training: false,
  },
  {
    id: 5,
    name: "Arun Verma",
    userImage: require("../../assets/images/users/driver2.png"),
    mno: "+91 9345678901",
    altno: "+91 9345609876",
    dlNo: "KA-0520120036789",
    ac: "PNB - 234567890123",
    pc: "560001",
    training: true,
  },
  {
    id: 6,
    name: "Santosh Patil",
    userImage: require("../../assets/images/users/driver1.jpg"),
    mno: "+91 9456789012",
    altno: "+91 9456709876",
    dlNo: "TN-0820160087654",
    ac: "BOB - 678901234567",
    pc: "600001",
    training: false,
  },
  {
    id: 7,
    name: "Manoj Gupta",
    userImage: require("../../assets/images/users/driver2.png"),
    mno: "+91 9876012345",
    altno: "+91 9876098765",
    dlNo: "GJ-0920170076543",
    ac: "Union Bank - 789012345678",
    pc: "380001",
    training: true,
  },
];

const DriversScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {addNewDriver()}
        {allDriversInfo()}
      </View>
    </View>
  );

  // list of drivers
  function allDriversInfo() {
    const renderItem = ({ item, index }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Image
              source={item.userImage}
              style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
            />
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
              <Text style={{ ...Fonts.blackColor16SemiBold }}>{item.name}</Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                {item.mno}, {item.altno}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                {item.training ? "Trained" : "Not Trained"}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("driver/editDriverScreen", { item })
                }
              >
                <FontAwesome6
                  name="pen"
                  size={20}
                  color={Colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {index == driversList.length - 1 ? null : (
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
          All Drivers
        </Text>
        <FlatList
          data={driversList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  // add new driver

  function addNewDriver() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("driver/addDriverScreen");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add New Driver</Text>
      </TouchableOpacity>
    );
  }

  // edit driver
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
          Drivers
        </Text>
      </View>
    );
  }
};

export default DriversScreen;

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
