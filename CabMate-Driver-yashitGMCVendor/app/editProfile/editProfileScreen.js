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
  screenHeight,
  screenWidth,
} from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { Menu } from "react-native-material-menu";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

const carBrandsList = [
  "Toyota",
  "Maruti Suzuki",
  "Hyundai",
  "Mahindra",
  "Tata Motors",
];

const carModelsList = [
  "Toyota Innova",
  "Maruti Wagon R",
  "Hyundai Creta",
  "Mahindra Xuv500",
  "Hyundai I10",
  "Renault Kwid",
  "Hyundai I20",
];

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("Cameron Williamson");
  const [email, setEmail] = useState("cameronwilliamson@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+91 1236457890");
  const [password, setPassword] = useState("123456789");
  const [showSheet, setShowSheet] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("GJ 5 AB 1258");
  const [showCarBrands, setShowCarBrands] = useState(false);
  const [selectedCarBrand, setSelectedCarBrand] = useState(carBrandsList[0]);
  const [showCarModels, setShowCarModels] = useState(false);
  const [selectedCarModel, setSelectedCarModel] = useState(carModelsList[0]);
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [drivingImage, setDrivingImage] = useState(null);
  const [panNo, setPanNo] = useState("BYSXY 12345");
  const [drivingNumber, setDrivingNumber] = useState("BYS1AY2345");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {personalInfo()}
          {/* {carInfo()} */}
          {documentInfo()}
        </ScrollView>
      </View>
      {saveButton()}
      {editProfilePicSheet()}
    </View>
  );

  function documentInfo() {
    return (
      <View style={styles.documentInfoWrapStyle}>
        <Text style={styles.carAndDocumentInfoTitleStyle}>Document</Text>
        {govermentIdInfo()}
        {drivingLicenseInfo()}
        {licenseInfo()}
      </View>
    );
  }

  function imagePicker(setImage, image, text) {
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    return (
      <View style={{ margin: Sizes.fixPadding * 2.0, alignItems: "left" }}>
        <Text style={{ ...Fonts.grayColor15SemiBold, marginBottom: 10 }}>
          {text}
        </Text>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 100 }}
            />
          ) : (
            <Text style={{ ...Fonts.grayColor14Regular }}>Select an Image</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  function selectImage(setImage) {
    const options = {
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setImage(source);
      }
    });
  }

  function govermentIdInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Addhar Card</Text>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => selectImage(setAadharImage)}
          style={styles.govermentIdAndLicenseWrapStyle}
        >
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={Colors.primaryColor}
          />
          {imagePicker(setAadharImage, aadharImage, "Upload Aadhar Card")}

          {/* <Text style={styles.textFieldStyle}>Upload Aadhar Card</Text> */}
        </TouchableOpacity>
        {divider()}
      </View>
    );
  }

  function licenseInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...Fonts.grayColor15SemiBold }}>Pan Card</Text>
        </View>
        <View style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={panNo ? Colors.primaryColor : Colors.lightGrayColor}
          />
          {imagePicker(setPanImage, panImage, "Upload Pancard")}
        </View>
        {divider()}
      </View>
    );
  }
  function drivingLicenseInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...Fonts.grayColor15SemiBold }}>Driving License</Text>
        </View>
        <View style={styles.govermentIdAndLicenseWrapStyle}>
          <MaterialCommunityIcons
            name="shield-check"
            size={18}
            color={drivingNumber ? Colors.primaryColor : Colors.lightGrayColor}
          />

          {imagePicker(setDrivingImage, drivingImage, "Upload Driving Licence")}
        </View>
        {divider()}
      </View>
    );
  }

  function carModelInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 6.0,
            ...Fonts.grayColor15SemiBold,
          }}
        >
          Car Model
        </Text>
        <Menu
          visible={showCarModels}
          anchor={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setShowCarModels(true);
              }}
              style={styles.carModelAndBrandWrapStyle}
            >
              <Text style={{ ...Fonts.blackColor16Bold }}>
                {selectedCarModel}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => {
            setShowCarModels(false);
          }}
        >
          <View style={styles.menuStyle}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            >
              {carModelsList.map((item, index) => (
                <Text
                  key={`${index}`}
                  onPress={() => {
                    setShowCarModels(false);
                    setSelectedCarModel(item);
                  }}
                  style={{
                    ...Fonts.blackColor16Bold,
                    marginBottom: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  {item}
                </Text>
              ))}
            </ScrollView>
          </View>
        </Menu>
        {divider()}
      </View>
    );
  }

  function carBrandInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding - 6.0,
            ...Fonts.grayColor15SemiBold,
          }}
        >
          Car Brand
        </Text>
        <Menu
          visible={showCarBrands}
          anchor={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setShowCarBrands(true);
              }}
              style={styles.carModelAndBrandWrapStyle}
            >
              <Text style={{ ...Fonts.blackColor16Bold }}>
                {selectedCarBrand}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          }
          onRequestClose={() => {
            setShowCarBrands(false);
          }}
        >
          <View style={styles.menuStyle}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            >
              {carBrandsList.map((item, index) => (
                <Text
                  key={`${index}`}
                  onPress={() => {
                    setShowCarBrands(false);
                    setSelectedCarBrand(item);
                  }}
                  style={{
                    ...Fonts.blackColor16Bold,
                    marginBottom: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                  }}
                >
                  {item}
                </Text>
              ))}
            </ScrollView>
          </View>
        </Menu>
        {divider()}
      </View>
    );
  }

  function vehicleNumberInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Vehicle Number</Text>
        <TextInput
          value={vehicleNumber}
          onChangeText={(value) => setVehicleNumber(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }

  function personalInfo() {
    return (
      <View style={styles.personalInfoWrapStyle}>
        <View style={styles.profilePicOuterWrapStyle}>{profilePic()}</View>
        {fullNameInfo()}
        {emailInfo()}
        {phoneNumberInfo()}
        {passwordInfo()}
      </View>
    );
  }

  function editProfilePicSheet() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSheet}
        onRequestClose={() => {
          setShowSheet(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowSheet(false);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.sheetWrapStyle}>
                <View style={styles.sheetIndicatorStyle} />
                <Text
                  style={{
                    marginBottom: Sizes.fixPadding * 2.0,
                    textAlign: "center",
                    ...Fonts.blackColor18Bold,
                  }}
                >
                  Choose Option
                </Text>
                {profilePicOptionSort({
                  icon: "photo-camera",
                  option: "Use Camera",
                  onPress: () => {
                    setShowSheet(false);
                  },
                })}
                {profilePicOptionSort({
                  icon: "photo",
                  option: "Upload from Gallery",
                  onPress: () => {
                    setShowSheet(false);
                  },
                })}
                {profilePicOptionSort({
                  icon: "delete",
                  option: "Remove Photo",
                  onPress: () => {
                    setShowSheet(false);
                  },
                })}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function profilePicOptionSort({ icon, option, onPress }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          marginBottom: Sizes.fixPadding + 5.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons name={icon} size={20} color={Colors.lightGrayColor} />
        <Text
          style={{
            marginLeft: Sizes.fixPadding + 5.0,
            flex: 1,
            ...Fonts.grayColor15SemiBold,
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function passwordInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          secureTextEntry
          clearTextOnFocus={false}
        />
        {divider()}
      </View>
    );
  }

  function phoneNumberInfo() {
    return (
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
    );
  }

  function emailInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          keyboardType="email-address"
        />
        {divider()}
      </View>
    );
  }

  function fullNameInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
        {divider()}
      </View>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
    );
  }

  function profilePic() {
    return (
      <View style={styles.profilePicWrapStyle}>
        <Image
          source={require("../../assets/images/users/user1.png")}
          style={{
            width: screenWidth / 4.8,
            height: screenWidth / 4.8,
            borderRadius: screenWidth / 4.8 / 2.0,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowSheet(true);
          }}
          style={styles.editIconWrapStyle}
        >
          <MaterialIcons
            name="camera-alt"
            size={screenWidth / 29.0}
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
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
          }}
        >
          Edit Profile
        </Text>
      </View>
    );
  }
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
  },
  editIconWrapStyle: {
    backgroundColor: Colors.whiteColor,
    width: screenWidth / 16.0,
    height: screenWidth / 16.0,
    borderRadius: screenWidth / 16.0 / 2.0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0.0,
    right: 0.0,
    elevation: 3.0,
    ...commonStyles.shadow,
  },
  profilePicWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
  sheetIndicatorStyle: {
    width: 50,
    height: 5.0,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    alignSelf: "center",
    marginVertical: Sizes.fixPadding * 2.0,
  },
  sheetWrapStyle: {
    borderTopLeftRadius: Sizes.fixPadding * 2.5,
    borderTopRightRadius: Sizes.fixPadding * 2.5,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingBottom: Platform.OS == "ios" ? Sizes.fixPadding : 0,
  },
  personalInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: screenWidth / 4.8 / 2.0 + Sizes.fixPadding,
    marginBottom: Sizes.fixPadding * 2.0,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
  },
  profilePicOuterWrapStyle: {
    alignItems: "center",
    marginTop: -(screenWidth / 4.8) / 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
  },
  carAndDocumentInfoTitleStyle: {
    marginTop: Sizes.fixPadding - 22.0,
    textAlign: "center",
    ...Fonts.blackColor18Bold,
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    paddingHorizontal: Sizes.fixPadding + 2.0,
  },
  carInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    elevation: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    margin: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
  carModelAndBrandWrapStyle: {
    marginBottom: Sizes.fixPadding - 4.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuStyle: {
    width: screenWidth - 80,
    paddingBottom: Sizes.fixPadding - 5.0,
    maxHeight: screenHeight - 150,
  },
  govermentIdAndLicenseWrapStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 4.0,
    flexDirection: "row",
    alignItems: "center",
  },
  documentInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.shadowColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 1.0,
    margin: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 2.0,
  },
});
