import { StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native";

const TermsConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: Sizes.fixPadding * 1.0 }}>
            <Text style={{ ...Fonts.blackColor20Bold, fontSize: 32 }}>
              Terms and Conditions
            </Text>
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "justify",
                marginHorizontal: Sizes.fixPadding,
              }}
            >
              {"\n"}Welcome to our website. If you continue to browse and use
              this website, you are agreeing to comply with and be bound by the
              following terms and conditions of use: {"\n"}
            </Text>
            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                fontSize: 18,
                marginHorizontal: Sizes.fixPadding * 2,
                marginTop: Sizes.fixPadding * 2,
              }}
            >
              {
                "1. This website's content is for general information and use only. It is subject to change without notice.\n\n"
              }
              {
                "2. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.\n\n"
              }
              {
                "3. This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics.\n\n"
              }
              {
                "4. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.\n\n"
              }
              {
                "5. From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s)."
              }
            </Text>
            <Text
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "justify",
                marginHorizontal: Sizes.fixPadding,
              }}
            >
              {"\n"}By using this website, you agree to the terms and conditions
              outlined above. {"\n"}
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
          Terms and Conditions
        </Text>
      </View>
    );
  }
};
export default TermsConditionsScreen;

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
