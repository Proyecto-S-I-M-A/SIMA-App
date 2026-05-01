import palette from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import styles from "./style";

export default function InputSearcher() {
  return (
    <View style={styles.searchBar}>
      <AntDesign name="search" size={18} color={palette.c700} />
      <Text style={styles.searchPlaceholder}>
        Buscar receta, doctor o medicamento
      </Text>
    </View>
  );
}
