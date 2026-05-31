import palette from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: palette.c100,
        },
        headerTintColor: palette.c900,
        tabBarActiveTintColor: palette.c900,
        tabBarInactiveTintColor: palette.c500,
        tabBarActiveBackgroundColor: palette.c100,
        tabBarInactiveBackgroundColor: palette.c50,
        tabBarStyle: {
          backgroundColor: palette.c50,
          borderTopColor: palette.c200,
        },
        tabBarLabelStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historial/historial"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <AntDesign name="history" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ubicacion/ubicacion"
        options={{
          title: "Ubicación",
          tabBarIcon: ({ color }) => (
            <AntDesign name="environment" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
