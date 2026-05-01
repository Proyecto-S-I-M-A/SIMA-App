import DataCardHeader from "@/components/DataCardHeader/Component";
import InputSearcher from "@/components/InputSearcher/Component";
import RecetaCard from "@/components/RecetaCard/Component";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palette = {
  c50: "#EFF6FB",
  c100: "#D5E6F1",
  c200: "#BDD6E5",
  c500: "#72A0C1",
  c700: "#4E7899",
  c900: "#1C3549",
  white: "#FFFFFF",
};

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DataCardHeader />
        <InputSearcher />
        <RecetaCard />
        <RecetaCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.c50,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 16,
  }
});
