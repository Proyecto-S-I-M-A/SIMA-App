import { Text, View } from "react-native";
import styles from "./style";

export default function RecetaCard() {
  return (
            <View style={styles.recipeCard}>
              <View style={styles.recipeCardTop}>
                <View>
                  <Text style={styles.recipeCode}>Receta #RX-2401</Text>
                  <Text style={styles.recipeDoctor}>Dr. Juan Pérez</Text>
                </View>
                <View style={styles.statusChipActive}>
                  <Text style={styles.statusChipText}>Activa</Text>
                </View>
              </View>
    
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Paciente</Text>
                  <Text style={styles.metaValue}>María González</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Fecha</Text>
                  <Text style={styles.metaValue}>30 Abr 2026</Text>
                </View>
              </View>
    
              <View style={styles.doseBlock}>
                <Text style={styles.doseTitle}>Dosis indicada</Text>
                <View style={styles.doseRow}>
                  <View style={styles.doseTagPrimary}>
                    <Text style={styles.doseTagLabel}>Paracetamol</Text>
                    <Text style={styles.doseTagValue}>500 mg</Text>
                  </View>
                  <View style={styles.doseTagSoft}>
                    <Text style={styles.doseTagLabel}>Cada</Text>
                    <Text style={styles.doseTagValue}>8 horas</Text>
                  </View>
                </View>
                <Text style={styles.instructions}>
                  Tomar 1 tableta después de los alimentos por 5 días.
                </Text>
              </View>
            </View>
  )
}