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
    registrationNo: "MH12AB1234",
    fuelMode: "Diesel", // Diesel/CNG-Petrol/Petrol/Hybrid/Electric
    registrationCertificate: {
      file: "",
      validFrom: "15-03-2023",
      validUpto: "14-03-2038",
    },
    permit1Yr: {
      validFrom: "01-04-2024",
      validUpto: "31-03-2025",
    },
    permit5Yr: {
      validFrom: "01-04-2024",
      validUpto: "31-03-2029",
    },
    fitnessCertificate: {
      validFrom: "15-03-2023",
      validUpto: "14-03-2033",
    },
    insurance: {
      validFrom: "01-06-2024",
      validUpto: "31-05-2025",
    },
    pollution: {
      validFrom: "10-07-2024",
      validUpto: "09-07-2025",
    },
    vehiclePhotos: [], // 4 side + 2 inside photos
    waitForValidationFromGMC: false,
  },
  {
    id: 2,
    registrationNo: "DL10CN6789",
    fuelMode: "CNG-Petrol",
    registrationCertificate: {
      file: "",
      validFrom: "20-05-2022",
      validUpto: "19-05-2037",
    },
    permit1Yr: {
      validFrom: "01-07-2024",
      validUpto: "30-06-2025",
    },
    permit5Yr: {
      validFrom: "01-07-2024",
      validUpto: "30-06-2029",
    },
    fitnessCertificate: {
      validFrom: "20-05-2022",
      validUpto: "19-05-2032",
    },
    insurance: {
      validFrom: "10-06-2024",
      validUpto: "09-06-2025",
    },
    pollution: {
      validFrom: "15-07-2024",
      validUpto: "14-07-2025",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
  {
    id: 3,
    registrationNo: "KA03MK4321",
    fuelMode: "Petrol",
    registrationCertificate: {
      file: "",
      validFrom: "10-08-2021",
      validUpto: "09-08-2036",
    },
    permit1Yr: {
      validFrom: "01-08-2024",
      validUpto: "31-07-2025",
    },
    permit5Yr: {
      validFrom: "01-08-2024",
      validUpto: "31-07-2029",
    },
    fitnessCertificate: {
      validFrom: "10-08-2021",
      validUpto: "09-08-2031",
    },
    insurance: {
      validFrom: "01-05-2024",
      validUpto: "30-04-2025",
    },
    pollution: {
      validFrom: "05-06-2024",
      validUpto: "04-06-2025",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
  {
    id: 4,
    registrationNo: "UP32AR9876",
    fuelMode: "Electric",
    registrationCertificate: {
      file: "",
      validFrom: "25-09-2023",
      validUpto: "24-09-2038",
    },
    permit1Yr: {
      validFrom: "01-10-2024",
      validUpto: "30-09-2025",
    },
    permit5Yr: {
      validFrom: "01-10-2024",
      validUpto: "30-09-2029",
    },
    fitnessCertificate: {
      validFrom: "25-09-2023",
      validUpto: "24-09-2033",
    },
    insurance: {
      validFrom: "15-04-2024",
      validUpto: "14-04-2025",
    },
    pollution: {
      validFrom: "N/A", // Electric vehicles don't require pollution certificates
      validUpto: "N/A",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
  {
    id: 5,
    registrationNo: "TN22XY5678",
    fuelMode: "Hybrid",
    registrationCertificate: {
      file: "",
      validFrom: "05-07-2020",
      validUpto: "04-07-2035",
    },
    permit1Yr: {
      validFrom: "01-09-2024",
      validUpto: "31-08-2025",
    },
    permit5Yr: {
      validFrom: "01-09-2024",
      validUpto: "31-08-2029",
    },
    fitnessCertificate: {
      validFrom: "05-07-2020",
      validUpto: "04-07-2030",
    },
    insurance: {
      validFrom: "10-03-2024",
      validUpto: "09-03-2025",
    },
    pollution: {
      validFrom: "12-06-2024",
      validUpto: "11-06-2025",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
  {
    id: 6,
    registrationNo: "RJ14AB1597",
    fuelMode: "Diesel",
    registrationCertificate: {
      file: "",
      validFrom: "12-02-2024",
      validUpto: "11-02-2039",
    },
    permit1Yr: {
      validFrom: "01-12-2024",
      validUpto: "30-11-2025",
    },
    permit5Yr: {
      validFrom: "01-12-2024",
      validUpto: "30-11-2029",
    },
    fitnessCertificate: {
      validFrom: "12-02-2024",
      validUpto: "11-02-2034",
    },
    insurance: {
      validFrom: "20-05-2024",
      validUpto: "19-05-2025",
    },
    pollution: {
      validFrom: "01-07-2024",
      validUpto: "30-06-2025",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
  {
    id: 7,
    registrationNo: "GJ01RT3456",
    fuelMode: "CNG-Petrol",
    registrationCertificate: {
      file: "",
      validFrom: "18-11-2023",
      validUpto: "17-11-2038",
    },
    permit1Yr: {
      validFrom: "01-11-2024",
      validUpto: "31-10-2025",
    },
    permit5Yr: {
      validFrom: "01-11-2024",
      validUpto: "31-10-2029",
    },
    fitnessCertificate: {
      validFrom: "18-11-2023",
      validUpto: "17-11-2033",
    },
    insurance: {
      validFrom: "10-07-2024",
      validUpto: "09-07-2025",
    },
    pollution: {
      validFrom: "22-06-2024",
      validUpto: "21-06-2025",
    },
    vehiclePhotos: [],
    waitForValidationFromGMC: false,
  },
];
const VehicleScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {addNewVehicle()}
        {allDriversInfo()}
      </View>
    </View>
  );

  // list of drivers
  function allDriversInfo() {
    const renderItem = ({ item, index }) => (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-between",
                columnGap: 100.0,
              }}
            >
              <View>
                <Image
                  style={{ width: 150.0, height: 60.0, borderRadius: 25.0 }}
                  source={require("../../assets/images/users/merc.png")}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("vehicle/editvehicleScreen", { item })
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
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                marginHorizontal: Sizes.fixPadding + 5.0,
              }}
            >
              <Text style={{ ...Fonts.blackColor16SemiBold }}>{item.name}</Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Vehicle no: {item.registrationNo}, Fuel Mode: {item.fuelMode}
              </Text>
              {/* 1yr */}
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Permit 1 Yr
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  From: {item.permit1Yr.validFrom}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  To: {item.permit1Yr.validUpto}
                </Text>
              </View>
              {/* 5yr */}
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Permit 5 Yr
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  From: {item.permit5Yr.validFrom}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  To: {item.permit5Yr.validUpto}
                </Text>
              </View>
              {/* fitnessCertificate */}
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Fitness certificate
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  From: {item.fitnessCertificate.validFrom}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  To: {item.fitnessCertificate.validUpto}
                </Text>
              </View>
              {/* insurance */}
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Insurance
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  From: {item.insurance.validFrom}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  To: {item.insurance.validUpto}
                </Text>
              </View>
              {/* pollution */}
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6.0,
                  ...Fonts.grayColor14Regular,
                }}
              >
                Pollution
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  From: {item.pollution.validFrom}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: Sizes.fixPadding - 6.0,
                    ...Fonts.grayColor14Regular,
                  }}
                >
                  To: {item.pollution.validUpto}
                </Text>
              </View>
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
          All Vehicles
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

  function addNewVehicle() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.push("vehicle/addvehicleScreen");
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add New Vehicle</Text>
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
          All Vehicles
        </Text>
      </View>
    );
  }
};

export default VehicleScreen;

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
