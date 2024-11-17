import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "coupleringapp",
  name: "coupleringapp",
  ios: {
    supportsTablet: true,
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAP_DIRECTION_API_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "couplerings.app",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAP_DIRECTION_API_KEY,
      },
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    ["expo-image-picker"],
    [
      "expo-location",
      {
        isAndroidForegroundServiceEnabled: true,
      },
    ],
  ],
});
