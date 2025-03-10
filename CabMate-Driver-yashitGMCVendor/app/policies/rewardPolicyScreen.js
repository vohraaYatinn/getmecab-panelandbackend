import { StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

const RewardPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.blackColor20Bold, fontSize: 32 }}>
              Reward Policy
            </Text>
            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                marginVertical: Sizes.fixPadding,
                fontSize: 20,
              }}
            >
              PRIZE GIVE AWAY
            </Text>
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                marginVertical: Sizes.fixPadding,
                fontSize: 20,
              }}
            >
              {"Apply Terms Conditions:\n"}
            </Text>
            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                fontSize: 15,
                marginHorizontal: Sizes.fixPadding * 1,
                // textAlign: "justify",
              }}
            >
              {"1. बुकिंग पोस्टर को कम से कम 25 पॉइंट करने जरूरी है ।\n\n"}
              {"2. एक बुकिंग complete होने पर एक पॉइंट मिलेगा |\n\n"}
              {
                "3. बुकिंग एक्सेप्ट होने के बाद कैंसल कराने पर एक पॉइंट कम हो जाएगा इसलिए कंफर्म बुकिंग ही पोस्ट करे |\n\n"
              }
              {
                "4. कम रेट की बुकिंग पोस्ट करने पर कंपनी द्वारा कैंसल कर दी जाएगी |\n\n"
              }
              {
                "5. बुकिंग पोस्टर के लिए कैश प्राइज 🏆 की रकम जानने के लिए हमें whatsapp / कॉल करके जानकारी प्राप्त करे |"
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
          Rewards Policy
        </Text>
      </View>
    );
  }
};
export default RewardPolicyScreen;

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
