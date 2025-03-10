import { StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

const RefundPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.blackColor20Bold, fontSize: 32 }}>
              Refund Policy
            </Text>

            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                fontSize: 18,
                // marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 2,
                textAlign: "justify",
              }}
            >
              {
                "At GetMeCab, we understand the importance of transparency and customer satisfaction. Our refund policy is designed to ensure fairness and clarity in all transactions, reflecting our commitment to providing a reliable and trustworthy service.\n\n"
              }
              {
                "If, for any reason, you need to cancel your reservation or encounter an issue with our service, our refund policy is as follows: Full refunds will be provided for cancellations made at least 24 hours before the scheduled pick-up time. Cancellations made within 24 hours of the scheduled pick-up time may be subject to a cancellation fee. In the event of any service-related issues, please contact our customer support team promptly, and we will work diligently to address and resolve the matter."
              }
              {
                "\n\nGetMeCab values your trust, and our refund policy aims to uphold the highest standards of customer service. Your satisfaction is our priority, and we appreciate the opportunity to serve you with integrity and fairness.\n\n"
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
          Refund Policy
        </Text>
      </View>
    );
  }
};
export default RefundPolicyScreen;

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
