import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeStackRouter from "./Stack.home";
import { primaryColor } from "src/util/constants";

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
            <FontAwesome name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default RootTabRouter;
