import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import Intro from "src/screens/Intro/Intro";
import RootTabRouter from "./Tab.root";
import Login from "src/screens/Auth/Login";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { primaryColor } from "src/util/constants";
import ForgetPassword from "src/screens/Auth/ForgetPassword";
import ResetPassword from "src/screens/Auth/ResetPassword";
import { getAccountProfile } from "src/services/account.service";
import { useQuery } from "@tanstack/react-query";
import { fetchAccountProfile } from "src/util/querykey";
import { useEffect } from "react";
import { saveProfile } from "src/redux/slices/auth.slice";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackRouter() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const { data: response } = useQuery({
    queryKey: [fetchAccountProfile],
    queryFn: () => {
      return getAccountProfile();
    },

    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(saveProfile(response.data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "RootTab" : "Intro"}
      screenOptions={{ animation: "ios" }}
    >
      {isAuthenticated === false && (
        <>
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              title: "COUPLE RINGS",
              headerTintColor: primaryColor,
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => (
                <MaterialCommunityIcons
                  name="ring"
                  size={24}
                  color={primaryColor}
                  style={{ marginRight: 5 }}
                />
              ),
            }}
          />

          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              headerShown: true,
              title: "COUPLE RINGS",
              headerTintColor: primaryColor,
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => (
                <MaterialCommunityIcons
                  name="ring"
                  size={24}
                  color={primaryColor}
                  style={{ marginRight: 5 }}
                />
              ),
            }}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerShown: true,
              title: "COUPLE RINGS",
              headerTintColor: primaryColor,
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => (
                <MaterialCommunityIcons
                  name="ring"
                  size={24}
                  color={primaryColor}
                  style={{ marginRight: 5 }}
                />
              ),
            }}
          />
        </>
      )}

      {isAuthenticated === true && (
        <>
          <Stack.Screen
            name="RootTab"
            component={RootTabRouter}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   image: {
//     width: "60%",
//     height: "60%",
//     borderRadius: 12 / 1.25,
//   },
//   container: {
//     width: 60,
//     height: 60,
//     borderRadius: 12 / 1.25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default RootStackRouter;
