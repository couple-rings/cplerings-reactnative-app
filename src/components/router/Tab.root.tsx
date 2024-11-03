import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackRouter from "./Stack.home";
import { primaryColor } from "src/util/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator<RootTabParamList>();

function RootTabRouter() {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarActiveTintColor: primaryColor,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackRouter}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="newspaper" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default RootTabRouter;
