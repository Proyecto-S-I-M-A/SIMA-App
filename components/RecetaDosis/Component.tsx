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
      {dosis.map((item, index) => (
        <View key={item.id} style={styles.itemCard}>
          {/* Número + medicamento + cantidad */}
          <View style={styles.itemHeader}>
            <View style={styles.indexBadge}>
              <Text style={styles.indexBadgeText}>{index + 1}</Text>
            </View>
            <Text style={styles.medicamentoName} numberOfLines={2}>
              {item.inventario?.nombre_medicamento || "—"}
            </Text>
            <View style={styles.cantidadChip}>
              <Text style={styles.cantidadText}>
                ×{item.cantidad ?? "—"}
              </Text>
            </View>
          </View>

          {/* Instrucciones */}
          {item.instrucciones ? (
            <View style={styles.instructionsBlock}>
              <Text style={styles.instructionsLabel}>Instrucciones</Text>
              <Text style={styles.instructionsText}>{item.instrucciones}</Text>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}
