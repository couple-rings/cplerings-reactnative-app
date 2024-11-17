import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { socket } from "src/config/socket";
import { primaryColor } from "src/util/constants";
import MapViewDirections from "react-native-maps-directions";

export default function Map() {
  const [myLocation, setMyLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [destination, setDestination] = useState({
    latitude: 10.731730508658583,
    longitude: 106.69069542954965,
  });

  useEffect(() => {
    socket.emit("join_room_location", 1, (response: string) =>
      console.log(response)
    );
  }, []);

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
      const coordinates = await Location.geocodeAsync(
        "36/31 Nguyễn Gia Trí, Phường 25, Bình Thạnh, Hồ Chí Minh"
      );
      if (coordinates && coordinates.length > 0) {
        console.log(coordinates);

        setDestination({
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const sub = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation },
      (location) => {
        const { latitude, longitude } = location.coords;

        socket.emit("location_update", {
          latitude,
          longitude,
          orderId: 1,
        });
      }
    );

    return () => {
      sub
        .then((subscription) => subscription.remove())
        .catch((err) => console.log(err));
    };
  }, []);

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
});
