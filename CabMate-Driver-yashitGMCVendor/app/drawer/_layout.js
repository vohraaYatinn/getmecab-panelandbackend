import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { screenWidth, Sizes } from '../../constants/styles';
import CustomDrawer from '../../components/customDrawerScreen';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: { width: screenWidth - 90.0, borderTopRightRadius: Sizes.fixPadding * 2.0, borderBottomRightRadius: Sizes.fixPadding * 2.0, },
                    drawerType: 'front',
                }}
            >
                <Drawer.Screen name="home/homeScreen" />
            </Drawer>
        </GestureHandlerRootView>
    );
}