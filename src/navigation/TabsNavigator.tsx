import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@/src/screens/HomeScreen';
import BookingScreen from '@/src/screens/BookingScreen';
import ProfileScreen from '@/src/screens/ProfileScreen';
import { COLORS } from '@/src/constants/colors';
import { SCREENS } from '@/src/constants/screens';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryGreen,
        tabBarInactiveTintColor: COLORS.neutralDarkLight,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case SCREENS.HOME:
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case SCREENS.BOOKING:
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case SCREENS.PROFILE:
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name={SCREENS.BOOKING} component={BookingScreen} options={{ title: 'New Play' }} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
