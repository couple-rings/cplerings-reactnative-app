import { createNativeStackNavigator } from "@react-navigation/native-stack";
import moment from "moment";
import OrderList from "src/screens/Home/Index";
import { primaryColor } from "src/util/constants";
import Header from "src/components/header/Header";
import OrderDetail from "src/screens/Home/OrderDetail";

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackRouter() {
  return (
    <Stack.Navigator
      initialRouteName={"OrderList"}
      screenOptions={{
        animation: "ios",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: primaryColor },
        headerTitleStyle: { color: "white" },
      }}
    >
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          header: () => (
            <Header
              title="Danh Sách Đơn"
              subtitle={moment().format("MMM Do YYYY")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerTintColor: "white",
          title: "Chi Tiết Đơn",
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackRouter;
