import { Text, View } from "react-native";
import type { DosisConInventario } from "@/types/RecetasYDosis";
import RecetaDosis from "../RecetaDosis/Component";
import styles from "./style";

interface RecetaCardProps {
  RecetaID?: number;
  DoctorRemitente?: string;
  Paciente?: string
  FechaEmision?: Date | string | null;
  FechaExpiracion?: Date | string | null;
  Dosis?: DosisConInventario[];
  RecetaEstado?: string;
} 

export default function RecetaCard(props: RecetaCardProps) {
  const {
  RecetaID,
  DoctorRemitente,
  Paciente,
  FechaEmision,
  FechaExpiracion,
  Dosis = [],
  RecetaEstado
  } = props;
  const formatDate = (value: Date | string | null | undefined) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  };
  const fechaEmisionText = formatDate(FechaEmision);
  const fechaExpiracionText = formatDate(FechaExpiracion);
  const recetaEstadoValue = (RecetaEstado ?? "").toLowerCase();
  const statusChipStyle = recetaEstadoValue.includes("pendiente")
    ? styles.statusChipPending
    : recetaEstadoValue.includes("retir")
      ? styles.statusChipRetirada
      : styles.statusChipActive;
  return (
            <View style={styles.recipeCard}>
              <View style={styles.recipeCardTop}>
                <View>
                  <Text style={styles.recipeCode}>Receta {RecetaID}</Text>
                  <Text style={styles.recipeDoctor}>Dr. {DoctorRemitente}</Text>
                </View>
                <View style={statusChipStyle}>
                  <Text style={styles.statusChipText}>{RecetaEstado}</Text>
                </View>
              </View>
    
              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Paciente</Text>
                  <Text style={styles.metaValue}>{Paciente}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Fecha</Text>
                  <Text style={styles.metaValue}>{fechaEmisionText}</Text>
                </View>
              </View>

              <View style={styles.metaGrid}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Expira</Text>
                  <Text style={styles.metaValue}>{fechaExpiracionText}</Text>
                </View>
              </View>
    
              <RecetaDosis dosis={Dosis} />
            </View>
  )
}