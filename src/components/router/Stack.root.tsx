import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "src/util/hooks";
import Intro from "src/screens/Intro/Intro";
import RootTabRouter from "./Tab.root";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStackRouter() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
