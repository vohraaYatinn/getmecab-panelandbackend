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
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
const fuelModeList = [
  { label: "Electric", value: "Electric" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Petrol", value: "Petrol" },
  { label: "CNG-Petrol", value: "CNG-Petrol" },
  { label: "Diesel", value: "Diesel" },
];
const EditVehicleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};

  // State for vehicle details
  const [registrationNo, setRegistrationNo] = useState(
    item?.registrationNo || ""
  );
  const [fuelMode, setFuelMode] = useState(item?.fuelMode || "");
  const [permit1YrValidFrom, setPermit1YrValidFrom] = useState(
    item?.permit1Yr?.validFrom || ""
  );
  const [permit1YrValidUpto, setPermit1YrValidUpto] = useState(
    item?.permit1Yr?.validUpto || ""
  );
  const [permit5YrValidFrom, setPermit5YrValidFrom] = useState(
    item?.permit5Yr?.validFrom || ""
  );
  const [permit5YrValidUpto, setPermit5YrValidUpto] = useState(
    item?.permit5Yr?.validUpto || ""
  );
  const [fitnessCertValidFrom, setFitnessCertValidFrom] = useState(
    item?.fitnessCertificate?.validFrom || ""
  );
  const [fitnessCertValidUpto, setFitnessCertValidUpto] = useState(
    item?.fitnessCertificate?.validUpto || ""
  );
  const [insuranceValidFrom, setInsuranceValidFrom] = useState(
    item?.insurance?.validFrom || ""
  );
  const [insuranceValidUpto, setInsuranceValidUpto] = useState(
    item?.insurance?.validUpto || ""
  );
  const [pollutionValidFrom, setPollutionValidFrom] = useState(
    item?.pollution?.validFrom || ""
  );
  const [pollutionValidUpto, setPollutionValidUpto] = useState(
    item?.pollution?.validUpto || ""
  );
  const [carImages, setCarImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  // Function to handle form submission (add new vehicle)
  const handleSubmit = () => {
    // Here you can handle form submission like adding the vehicle to a database
    console.log("Vehicle added:", {
      registrationNo,
      fuelMode,
      permit1Yr: {
        validFrom: permit1YrValidFrom,
        validUpto: permit1YrValidUpto,
      },
      permit5Yr: {
        validFrom: permit5YrValidFrom,
        validUpto: permit5YrValidUpto,
      },
      fitnessCertificate: {
        validFrom: fitnessCertValidFrom,
        validUpto: fitnessCertValidUpto,
      },
      insurance: {
        validFrom: insuranceValidFrom,
        validUpto: insuranceValidUpto,
      },
      pollution: {
        validFrom: pollutionValidFrom,
        validUpto: pollutionValidUpto,
      },
    });
    // Navigate back or to another screen after adding the vehicle
    navigation.pop();
  };

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
            {/* Registration Number */}
            <Text style={{ ...Fonts.grayColor15SemiBold }}>
              Registration Number
            </Text>
            <TextInput
              value={registrationNo}
              onChangeText={(value) => setRegistrationNo(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Enter registration number"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}

            {/* Fuel Mode */}

            {/* Fuel Mode */}
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Fuel mode</Text>
            <View style={styles.pickerContainer}>
              <SelectDropdown
                data={fuelModeList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem.value, index);
                  setFuelMode(selectedItem.value);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && fuelMode) || "Select Fuel Mode"}
                      </Text>
                      <Icon
                        name={isOpened ? "chevron-up" : "chevron-down"}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.label}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            {divider()}
            {/* Permit 1 Year */}
            {permit1Info()}
            {/* Permit 5 Year */}
            {permit5Info()}
            {/* Fitness Certificate */}
            {fitnessInfo()}
            {/* Insurance */}
            {insuranceInfo()}
            {/* Pollution */}
            {polutionInfo()}
            {imagePicker()}
            {/* Submit Button */}
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleSubmit();
            // navigation.pop();
          }}
          style={styles.buttonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Edit Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function imagePicker() {
    const pickImage = async (index) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
      });

      if (!result.canceled) {
        const updatedImages = [...carImages];
        updatedImages[index] = result.assets[0].uri;
        setCarImages(updatedImages);
      }
    };

    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>
          Upload Car Images (4 Outer + 2 Inner)
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {carImages?.map((image, index) => (
            <View key={index} style={{ margin: Sizes.fixPadding }}>
              <TouchableOpacity onPress={() => pickImage(index)}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                  />
                ) : (
                  <Text style={{ ...Fonts.grayColor14Regular }}>
                    Select Image {index + 1}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }

  function permit1Info() {
    return (
      <View>
        <Text
          style={{
            ...Fonts.blackColor20ExtraBold,
            marginTop: Sizes.fixPadding,
          }}
        >
          1Yr Permit
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid From</Text>
            <TextInput
              value={permit1YrValidFrom}
              onChangeText={(value) => setPermit1YrValidFrom(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid From"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid Upto</Text>

            <TextInput
              value={permit1YrValidUpto}
              onChangeText={(value) => setPermit1YrValidUpto(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid Upto"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </View>
      </View>
    );
  }
  function permit5Info() {
    return (
      <View>
        <Text
          style={{
            ...Fonts.blackColor20ExtraBold,
            marginTop: Sizes.fixPadding,
          }}
        >
          5Yr Permit
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid From</Text>
            <TextInput
              value={permit5YrValidFrom}
              onChangeText={(value) => setPermit5YrValidFrom(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid From"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid Upto</Text>

            <TextInput
              value={permit5YrValidUpto}
              onChangeText={(value) => setPermit5YrValidUpto(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid Upto"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </View>
      </View>
    );
  }
  function fitnessInfo() {
    return (
      <View>
        <Text
          style={{
            ...Fonts.blackColor20ExtraBold,
            marginTop: Sizes.fixPadding,
          }}
        >
          Fitness
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid From</Text>
            <TextInput
              value={fitnessCertValidFrom}
              onChangeText={(value) => setFitnessCertValidFrom(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid From"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid Upto</Text>

            <TextInput
              value={fitnessCertValidUpto}
              onChangeText={(value) => setFitnessCertValidUpto(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid Upto"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </View>
      </View>
    );
  }
  function insuranceInfo() {
    return (
      <View>
        <Text
          style={{
            ...Fonts.blackColor20ExtraBold,
            marginTop: Sizes.fixPadding,
          }}
        >
          Insurance
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid From</Text>
            <TextInput
              value={insuranceValidFrom}
              onChangeText={(value) => setInsuranceValidFrom(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid From"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid Upto</Text>

            <TextInput
              value={insuranceValidUpto}
              onChangeText={(value) => setInsuranceValidUpto(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid Upto"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </View>
      </View>
    );
  }
  function polutionInfo() {
    return (
      <View>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          Pollution
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            rowGap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid From</Text>
            <TextInput
              value={pollutionValidFrom}
              onChangeText={(value) => setPollutionValidFrom(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid From"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text style={{ ...Fonts.grayColor15SemiBold }}>Valid Upto</Text>

            <TextInput
              value={pollutionValidUpto}
              onChangeText={(value) => setPollutionValidUpto(value)}
              style={styles.textFieldStyle}
              cursorColor={Colors.primaryColor}
              selectionColor={Colors.primaryColor}
              placeholder="Valid Upto"
              placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
          </View>
        </View>
      </View>
    );
  }

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
          Edit Vehicle
        </Text>
      </View>
    );
  }
};

export default EditVehicleScreen;

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
