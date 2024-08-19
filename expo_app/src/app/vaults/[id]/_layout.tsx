import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useLocalSearchParams } from "expo-router";

export default function VaultsTabLayout() {
  const { id } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // for passing params across tabs
        unmountOnBlur: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
        initialParams={{ id }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
        initialParams={{ id }}
      />
    </Tabs>
  );
}
