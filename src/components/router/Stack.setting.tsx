import { createNativeStackNavigator } from "@react-navigation/native-stack";
import moment from "moment";
import { primaryColor } from "src/util/constants";
import Header from "src/components/header/Header";
import Setting from "src/screens/Setting/Index";
import Status from "src/screens/Setting/Status";
import Profile from "src/screens/Setting/Profle";
import Security from "src/screens/Setting/Security";

const Stack = createNativeStackNavigator<SettingStackParamList>();

function SettingStackRouter() {
  return (
    <Stack.Navigator
      initialRouteName={"Setting"}
      screenOptions={{
        animation: "ios",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: primaryColor },
        headerTitleStyle: { color: "white" },
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => (
            <Header title="Cài Đặt" subtitle={moment().format("MMM Do YYYY")} />
          ),
        }}
      />

      <Stack.Screen
        name="Status"
        component={Status}
        options={{
          title: "Trạng Thái",
          headerBackVisible: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Thông Tin Cá Nhân",
          headerBackVisible: true,
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          title: "Bảo Mật",
          headerBackVisible: true,
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingStackRouter;
