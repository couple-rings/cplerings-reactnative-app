import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackRouter from "./Stack.home";
import { primaryColor } from "src/util/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatStackRouter from "./Stack.chat";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import { socket } from "src/config/socket";
import SettingStackRouter from "./Stack.setting";
import Map from "src/screens/Map/Map";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator<RootTabParamList>();

function RootTabRouter() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected: ", socket.connected);
    });

    return () => {
      socket.off("connect", () => {
        console.log("socket disconnected: ", socket.connected);
      });
    };
  }, []);

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

      <Tab.Screen
        name="ChatStack"
        component={ChatStackRouter}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map" size={24} color={color} />
          ),
          title: "Bản Đồ",
          headerStyle: { backgroundColor: primaryColor },
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
        }}
      />

      <Tab.Screen
        name="SettingStack"
        component={SettingStackRouter}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default RootTabRouter;
