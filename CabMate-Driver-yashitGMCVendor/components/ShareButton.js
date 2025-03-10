import React from "react";
import { TouchableOpacity, Share } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

// const ShareApp = ({ booking }) => {
//   const shareViaWhatsApp = async () => {
//     // Construct your message with booking details
//     const message = `🙏 Required 🙏

// 🏘️ Pickup:-    ${booking?.pickUpAddress || "Not Available"}
// 🛣️ Drop:-      ${booking?.dropAddress || "Not Available"}
// 🚕 Taxi:-      ${booking?.vehicle || "Not Available"}
// 🗓️ Date:-      ${booking?.startDate || "Not Available"}
// 🕙 Time:-      ${booking?.startTime || "Not Available"}
// 💰 Toll:-      ${booking?.toll || "Included"}
// 💰 Tax:-       ${booking?.tax || "Included"}
// 🅿️ Driver Allowance:-   ${booking?.driverAllowance || "Excluded"}

// ⚠️ Note:-    Reference or Advance

// ज्यादा से ज्यादा बूकिंग accept करने या पोस्ट करने के लिए नीचे दिए लिंक को ओपन करके ऐप को Download करे

// 👇👇👇👇👇👇👇👇

// https://play.google.com/store/apps/details?id=in.chooseataxi.partner`;

//     try {
//       // Create a temporary file with the message content
//       const fileUri = FileSystem.cacheDirectory + "share.txt";
//       await FileSystem.writeAsStringAsync(fileUri, message, {
//         encoding: FileSystem.EncodingType.UTF8,
//       });
//       // Share the file using expo-sharing
//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.log("Sharing failed:", error);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={shareViaWhatsApp}>
//       <Ionicons
//         name="share-social-outline"
//         size={22}
//         color={Colors.primaryColor}
//       />
//     </TouchableOpacity>
//   );
// };

// export default ShareApp;

const ShareApp = ({ booking }) => {
  const shareMessage = async () => {
    const message = `🙏 Required 🙏
  
  🏘️ Pickup:    ${booking?.pickUpAddress || "Not Available"}
  🛣️ Drop:      ${booking?.dropAddress || "Not Available"}
  🚕 Taxi:      ${booking?.vehicle || "Not Available"}
  🗓️ Date:      ${booking?.startDate || "Not Available"}
  🕙 Time:      ${booking?.startTime || "Not Available"}
  💰 Toll:      ${booking?.toll || "Included"}
  💰 Tax:       ${booking?.tax || "Included"}
  🅿️ Driver Allowance:   ${booking?.driverAllowance || "Excluded"}
  
  ⚠️ Note:    Reference or Advance
  
  ज्यादा से ज्यादा बूकिंग accept करने या पोस्ट करने के लिए नीचे दिए लिंक को ओपन करके ऐप को Download करे
  
  👇👇👇👇👇👇👇👇
  
  https://play.google.com/store/apps/details?id=in.chooseataxi.partner`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.log("Sharing failed:", error);
    }
  };

  return (
    <TouchableOpacity onPress={shareMessage}>
      <Ionicons name="share-social" size={30} color={Colors.blackColor} />
    </TouchableOpacity>
  );
};

export default ShareApp;
