import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
