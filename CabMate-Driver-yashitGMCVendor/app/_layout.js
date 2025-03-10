import { useFonts } from "expo-font";
import { Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState, LogBox, View, StatusBar } from "react-native";
import BottomTabNavigator from "../components/bootomNavigationBar";

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    NunitoSans_Regular: require("../assets/fonts/NunitoSans-Regular.ttf"),
    NunitoSans_SemiBold: require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    NunitoSans_Bold: require("../assets/fonts/NunitoSans-Bold.ttf"),
    NunitoSans_ExtraBold: require("../assets/fonts/NunitoSans-ExtraBold.ttf"),
    Rasa_Bold: require("../assets/fonts/Rasa-Bold.ttf"),
  });

  const segments = useSegments(); // Get the current route segments

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const subscription = AppState.addEventListener("change", (_) => {
      StatusBar.setBarStyle("light-content");
    });
    return () => {
      subscription.remove();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Hide BottomTabNavigator on auth screens
  const isAuthScreen =
    segments[0] === "auth" &&
    (segments[1] === "loginScreen" ||
      segments[1] === "registerScreen" ||
      segments[1] === "verificationScreen");

  const isIndex = segments.length === 0;

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="auth/loginScreen"
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="auth/registerScreen" />
        <Stack.Screen name="auth/verificationScreen" />
        <Stack.Screen name="drawer" options={{ gestureEnabled: false }} />
        <Stack.Screen name="chatWithPassenger/chatWithPassengerScreen" />
        <Stack.Screen name="goToPickup/goToPickupScreen" />
        <Stack.Screen name="startRide/startRideScreen" />
        <Stack.Screen name="endRide/endRideScreen" />
        <Stack.Screen name="editProfile/editProfileScreen" />
        <Stack.Screen name="userRides/userRidesScreen" />
        <Stack.Screen name="rideDetail/rideDetailScreen" />
        <Stack.Screen name="userRatings/userRatingsScreen" />
        <Stack.Screen name="wallet/walletScreen" />
        <Stack.Screen name="inviteFriends/inviteFriendsScreen" />
        <Stack.Screen name="faqs/faqsScreen" />
        <Stack.Screen name="contactUs/contactUsScreen" />
        <Stack.Screen name="driver/driversScreen" />
        <Stack.Screen name="driver/editDriverScreen" />
        <Stack.Screen name="driver/addDriverScreen" />
        <Stack.Screen name="vehicle/vehiclesScreen" />
        <Stack.Screen name="vehicle/addvehicleScreen" />
        <Stack.Screen name="vehicle/editvehicleScreen" />
        <Stack.Screen name="security/securityDepositScreen" />
        <Stack.Screen name="vendorLedger/vendorLedgerScreen" />
        <Stack.Screen name="vendorLedger/addLedgerScreen" />
        <Stack.Screen name="bookings/bookingFormScreen" />
        <Stack.Screen name="bookings/acceptBookingScreen" />
        <Stack.Screen name="bookings/newBookingScreen" />
        <Stack.Screen name="bookings/completedBookingScreen" />
        <Stack.Screen name="help&Support/help&SupportScreen" />
        <Stack.Screen name="policies/rewardPolicyScreen" />
        <Stack.Screen name="policies/penaltyPolicyScreen" />
        <Stack.Screen name="policies/termsConditionScreen" />
        <Stack.Screen name="policies/refundPolicyScreen" />
        <Stack.Screen name="policies/privacyPolicyScreen" />
      </Stack>

      {/* Only show BottomTabNavigator if it's NOT an auth screen */}
      {!isAuthScreen && !isIndex && <BottomTabNavigator />}
    </View>
  );
}
