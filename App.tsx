import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "src/redux/store";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import RootStackRouter from "src/components/router/Stack.root";
import React from "react";
import { decode } from "base-64";
global.atob = decode;

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 3 },
  },
});

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <RootStackRouter />
              </NavigationContainer>
            </QueryClientProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>

      <Toast />
    </>
  );
}
