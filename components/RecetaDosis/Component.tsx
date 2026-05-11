import type { DosisConInventario } from "@/types/RecetasYDosis";
import { Text, View } from "react-native";
import styles from "./style";

type RecetaDosisProps = {
  dosis: DosisConInventario[];
};

export default function RecetaDosis({ dosis }: RecetaDosisProps) {
  if (!dosis.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dosis indicada</Text>
        <Text style={styles.emptyText}>Sin dosis registradas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dosis indicada</Text>
      {dosis.map((item) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.row}>
            <View style={styles.tagPrimary}>
              <Text style={styles.tagLabel}>Medicamento</Text>
              <Text style={styles.tagValue}>
                {item.inventario?.nombre_medicamento || "-"}
              </Text>
            </View>
            <View style={styles.tagSoft}>
              <Text style={styles.tagLabel}>Cantidad</Text>
              <Text style={styles.tagValue}>
                {item.cantidad ?? "-"}
              </Text>
            </View>
          </View>
          {item.instrucciones ? (
            <Text style={styles.instructions}>{item.instrucciones}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}
