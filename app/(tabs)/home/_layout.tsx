import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";


const palette = {
  c100: "#D5E6F1",
  c500: "#72A0C1",
  c900: "#1C3549",
};

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
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio", tabBarIcon: () => <AntDesign name="home" size={20} /> }} />
    </Tabs>
  );
}
