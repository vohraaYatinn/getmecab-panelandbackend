import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Sizes, commonStyles } from "../../constants/styles";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { bookingData } from "../../assets/jsonFiles/bookings.json";
import userImg from "../../assets/images/users/user14.png";

const WalletScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {walletInfo()}
          {addWalletButton()}
          {recentTransactionsInfo()}
        </ScrollView>
        <AddWalletModal />
      </View>
    </View>
  );

  function recentTransactionsInfo() {
    const renderItem = ({ item }) => (
      <View
        style={{ flex: 1, backgroundColor: "#f9f9f9", paddingHorizontal: 10 }}
      >
        <View
          style={[
            { flexDirection: "row", justifyContent: "space-between" },
            styles.card,
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Image
              source={userImg}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5 }}>
              <Text style={{ ...Fonts.blackColor16SemiBold }}>
                {item.customerName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6,
                  ...Fonts.grayColor14Regular,
                }}
              >
                From: {item.pickUpAddress}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: Sizes.fixPadding - 6,
                  ...Fonts.grayColor14Regular,
                }}
              >
                To: {item.dropAddress}
              </Text>
            </View>
          </View>
          <Text style={{ ...Fonts.primaryColor16Bold }}>
            ₹{item.commission}
          </Text>
        </View>
      </View>
    );

    return (
      <View style={{ flex: 1, marginTop: Sizes.fixPadding }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2,
            marginBottom: Sizes.fixPadding + 5,
            ...Fonts.blackColor18Bold,
          }}
        >
          Recent Transactions
        </Text>
        <FlatList
          data={bookingData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function walletInfo() {
    return (
      <View style={styles.walletInfoWrapStyle}>
        <Text
          style={{
            marginTop: Sizes.fixPadding + 2,
            ...Fonts.grayColor16SemiBold,
            fontSize: 18,
          }}
        >
          Total Balance
        </Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 8,
            ...Fonts.blackColor16SemiBold,
            fontSize: 40,
          }}
        >
          ₹250
        </Text>
      </View>
    );
  }

  function addWalletButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={styles.buttonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Add Money</Text>
      </TouchableOpacity>
    );
  }

  function AddWalletModal() {
    return (
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ ...Fonts.blackColor18Bold, marginBottom: 10 }}>
              Add Money to Wallet
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                setAmount("");
                // Add wallet balance update logic here
              }}
            >
              <Text style={{ ...Fonts.whiteColor18Bold }}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...Fonts.primaryColor16Bold }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            marginLeft: Sizes.fixPadding + 2,
            ...Fonts.blackColor20ExtraBold,
          }}
        >
          Wallet
        </Text>
      </View>
    );
  }
};

export default WalletScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding + 5,
    marginVertical: Sizes.fixPadding * 2,
  },
  walletInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3,
    borderRadius: Sizes.fixPadding - 5,
    marginHorizontal: Sizes.fixPadding * 4,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    padding: Sizes.fixPadding + 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    ...commonStyles.shadow,
  },
  card: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5,
    paddingVertical: Sizes.fixPadding + 3,
    marginHorizontal: Sizes.fixPadding * 6,
    marginVertical: Sizes.fixPadding * 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.whiteColor,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grayColor,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});
