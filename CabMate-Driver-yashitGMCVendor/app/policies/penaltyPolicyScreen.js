import { StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

const PenaltyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: Sizes.fixPadding * 1.0 }}>
            <Text style={{ ...Fonts.blackColor20Bold, fontSize: 32 }}>
              Penalty Policy
            </Text>

            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                fontSize: 16,
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 2,
              }}
            >
              {
                "1. ड्यूटी एक्सेप्ट करने के बाद कैब नही लगाने पर आपको 1500 /- पेनल्टी लगेगी।\n\n"
              }
              {
                "2. बुकिंग एक्सेप्ट के 5 मिनट बाद कैंसल करने पर 100 rs और 15 मिनट बाद 500 rs और 30 मिनट बाद 1000 rs 1 घंटे बाद 1500 की पेनल्टी लगेगी।\n\n"
              }
              {
                "3. अर्जेंट वाली बुकिंग में एक्सेप्ट करने के बाद 15 मिनट तक कैंसल करने पर 500 rs और 30 के अंदर कैंसल करने पर 1000 rs उसके बाद में करने पर 1500 पेनल्टी लगेगी।\n\n"
              }
              {
                "4. कैब बुकिंग टाइम से 15 मिनट से ज्यादा लेट होने पर कस्टमर की कंप्लेन आने पर आपको पेनल्टी लग सकती है।\n\n"
              }
              {
                "5. बुकिंग में ड्राईवर और कैब कंपनी को या बुकिंग पोस्टर को दी हुई डीटेल वाली ही भेजे, अलग नंबर की कैब या ड्राइवर पर 100 /- पेनल्टी लग सकती है।\n\n"
              }
              {
                "6. कैब हमेशा साफ - सुथरी रखे, अगर कस्टमर की तरफ से कोई कंप्लेन आती है तो वेरीफिकेशन के बाद 100 से 200 तक पेनल्टी लग सकती है।\n\n"
              }
              {
                "7. प्राइवेट कार पर कोई बुकिंग एक्सेप्ट ना करे, इससे आपको पेनल्टी के साथ-साथ अकाउंट भी ब्लॉक कर दिया जाएगा।"
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
          Penalty Policy
        </Text>
      </View>
    );
  }
};
export default PenaltyPolicyScreen;

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
