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
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const driversList = [
  {
    id: 1,
    name: "John Doe",
    userImage: require("../../assets/images/users/user2.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: true,
  },
  {
    id: 2,
    name: "John lores",
    userImage: require("../../assets/images/users/user10.png"),
    mno: "+91 887888888",
    altno: "+91 845888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: true,
  },
  {
    id: 3,
    name: "John Doe",
    userImage: require("../../assets/images/users/user17.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: true,
  },
  {
    id: 4,
    name: "John Doe",
    userImage: require("../../assets/images/users/user13.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: false,
  },
  {
    id: 5,
    name: "John Doe",
    userImage: require("../../assets/images/users/user16.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: true,
  },
  {
    id: 6,
    name: "John Doe",
    userImage: require("../../assets/images/users/user14.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: false,
  },
  {
    id: 7,
    name: "John Doe",
    userImage: require("../../assets/images/users/user15.png"),
    mno: "+91 888888888",
    altno: "+91 888888878",
    dlNo: "",
    ac: "",
    pc: "",
    training: true,
  },
];
const AddDriversScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [drivingImage, setDrivingImage] = useState(null);
  const [panNo, setPanNo] = useState("BYSXY 12345");
  const [drivingNumber, setDrivingNumber] = useState("BYS1AY2345");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [altNumber, setaltNumber] = useState("");
  const [name, setName] = useState("");
  const [training, settraining] = useState("");
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {/* {allDriversInfo()} */}
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {fullNameInfo()}
          {phoneNumberInfo()}
          {trainingInfo()}
          {documentInfo()}
        </ScrollView>

        {addDriver()}
      </View>
    </View>
  );

  function documentInfo() {
    return (
      <View>
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
          placeholder="Enter Full Name"
        />
        {divider()}
      </View>
    );
  }
  function trainingInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Text style={{ ...Fonts.grayColor15SemiBold }}>Full Name</Text>
        <TextInput
          value={training ? "Trained" : "Not Trained"}
          onChangeText={(value) => settraining(value)}
          style={styles.textFieldStyle}
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
        />
        {divider()}
      </View>
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
            placeholder="Enter Phone Number"
          />
          {divider()}
        </View>
        <View
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
          }}
        >
          <Text style={{ ...Fonts.grayColor15SemiBold }}>
            Alternative Number
          </Text>
          <TextInput
            value={altNumber}
            onChangeText={(value) => setaltNumber(value)}
            style={styles.textFieldStyle}
            cursorColor={Colors.primaryColor}
            selectionColor={Colors.primaryColor}
            keyboardType="phone-pad"
            placeholder="Enter Alternative Number"
          />
          {divider()}
        </View>
      </>
    );
  }
  function divider() {
    return (
      <View style={{ backgroundColor: Colors.shadowColor, height: 1.0 }} />
    );
  }

  function addDriver() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add Driver</Text>
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
          Add Drivers
        </Text>
      </View>
    );
  }
};

export default AddDriversScreen;

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
