import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useLocalSearchParams } from "expo-router";

import { SpendingsProvider } from "@/features/spendings/contexts/SpendingsContext";
import { Spendings } from "@/features/spendings/types/spendings";

export default function SpendingsTabLayout() {
  const { id } = useLocalSearchParams();
  const spendings: Spendings = {
    id: id.toString(),
  };

  return (
    <SpendingsProvider spendings={spendings}>
      <Tabs
        screenOptions={{
          headerShown: false,
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
          name="detail"
          options={{
            title: "Detail",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="bars" color={color} />
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
    </SpendingsProvider>
  );
}
