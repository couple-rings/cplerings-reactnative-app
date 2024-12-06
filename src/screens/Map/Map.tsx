import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { socket } from "src/config/socket";
import { primaryColor } from "src/util/constants";
import MapViewDirections from "react-native-maps-directions";
import { useAppSelector } from "src/util/hooks";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { fetchTransportOrderDetail } from "src/util/querykey";
import { getTransportOrderDetail } from "src/services/transportOrder.service";
import { useQuery } from "@tanstack/react-query";

export default function Map() {
  const [order, setOrder] = useState<ITransportOrder | null>(null);
  const [myLocation, setMyLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [destination, setDestination] = useState({
    latitude: 10.731730508658583,
    longitude: 106.69069542954965,
  });

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const { currentOrder } = useAppSelector((state) => state.order);

  const { data: orderResponse, isLoading } = useQuery({
    queryKey: [fetchTransportOrderDetail, currentOrder],

    queryFn: () => {
      return getTransportOrderDetail(currentOrder);
    },
    enabled: currentOrder !== 0,
  });

  useEffect(() => {
    if (!currentOrder || currentOrder === 0) {
      navigation.navigate("HomeStack", { screen: "OrderList" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

  useEffect(() => {
    let id = 0;

    if (order?.customOrder) id = order.customOrder.id;
    if (order?.standardOrder) id = order.standardOrder.id;

    socket.emit("join_room_location", id, (response: string) =>
      console.log(response)
    );
  }, [order]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Quyền truy cập vị trí bị từ chối",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setMyLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (order) {
        const coordinates = await Location.geocodeAsync(order.deliveryAddress);
        if (coordinates && coordinates.length > 0) {
          console.log(coordinates);

          setDestination({
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
          });
        }
      }
    })();
  }, [order]);

  useEffect(() => {
    const sub = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation },
      (location) => {
        const { latitude, longitude } = location.coords;

        let orderId = 0;
        if (order?.customOrder) orderId = order.customOrder.id;
        if (order?.standardOrder) orderId = order.standardOrder.id;

        socket.emit("location_update", {
          latitude,
          longitude,
          orderId,
        });
      }
    );

    return () => {
      sub
        .then((subscription) => subscription.remove())
        .catch((err) => console.log(err));
    };
  }, [order]);

  useEffect(() => {
    if (orderResponse?.data) {
      setOrder(orderResponse.data.transportationOrder);
    }
  }, [orderResponse]);

  if (isLoading || !order)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={primaryColor} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      {myLocation ? (
        <MapView
          initialRegion={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled
          showsMyLocationButton
          showsUserLocation
          showsCompass
        >
          <Marker coordinate={destination} title="Điểm đến" />

          {myLocation !== null && (
            <MapViewDirections
              origin={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              destination={destination}
              apikey={process.env.GOOGLE_MAP_DIRECTION_API_KEY as string}
              strokeWidth={2}
              strokeColor="red"
            />
          )}
        </MapView>
      ) : (
        <ActivityIndicator size={"large"} color={primaryColor} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
