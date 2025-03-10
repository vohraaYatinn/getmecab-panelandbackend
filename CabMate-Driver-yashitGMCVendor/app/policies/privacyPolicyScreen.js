import { StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.blackColor20Bold, fontSize: 32 }}>
              Privacy Policy
            </Text>

            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                fontSize: 18,
                // marginHorizontal: Sizes.fixPadding * 2,
                textAlign: "justify",
                marginTop: Sizes.fixPadding * 2,
              }}
            >
              {
                "At Get Me Cab, we prioritize the privacy and security of our users. This Privacy Policy outlines the information we collect, how it is used, and the measures we take to safeguard your personal data. By using our services, you consent to the practices described in this policy.\n\n"
              }
              {
                "We collect basic user information, such as name, contact details, and location, to facilitate the booking process and enhance your overall experience. This information is securely stored and used solely for service-related purposes. We do not share, sell, or disclose your personal data to third parties without your explicit consent.\n\n"
              }
              {
                "Our website and app may use cookies to improve functionality and personalize your experience. These cookies do not contain personally identifiable information and can be managed through your browser settings. We also employ industry-standard security protocols to protect against unauthorized access, ensuring the confidentiality of your data.\n\n"
              }
              {
                "Get Me Cab reserves the right to update this Privacy Policy as needed. Users will be notified of any significant changes. For queries or concerns regarding your privacy, please contact our support team."
              }
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );

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
          Privacy Policy
        </Text>
      </View>
    );
  }
};
export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5.0,
    marginVertical: Sizes.fixPadding * 2.0,
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
