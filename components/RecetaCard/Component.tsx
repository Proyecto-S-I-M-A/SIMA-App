import type { DosisConInventario } from "@/types/RecetasYDosis";
import { Text, View } from "react-native";
import RecetaDosis from "../RecetaDosis/Component";
import styles from "./style";

interface RecetaCardProps {
  RecetaID?: number;
  DoctorRemitente?: string;
  Paciente?: string;
  FechaEmision?: Date | string | null;
  FechaExpiracion?: Date | string | null;
  Dosis?: DosisConInventario[];
  RecetaEstado?: string;
}

function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("es-PA", { day: "2-digit", month: "short", year: "numeric" });
}

function getStatusStyles(estado: string) {
  const e = estado.toLowerCase();
  if (e.includes("pend")) {
    return {
      accent: styles.accentPending,
      chip: styles.statusChipPending,
      dot: styles.statusDotPending,
      text: styles.statusTextPending,
    };
  }
  if (e.includes("retir")) {
    return {
      accent: styles.accentRetirada,
      chip: styles.statusChipRetirada,
      dot: styles.statusDotRetirada,
      text: styles.statusTextRetirada,
    };
  }
  return {
    accent: styles.accentActive,
    chip: styles.statusChipActive,
    dot: styles.statusDotActive,
    text: styles.statusTextActive,
  };
}

export default function RecetaCard({
  RecetaID,
  DoctorRemitente,
  Paciente,
  FechaEmision,
  FechaExpiracion,
  Dosis = [],
  RecetaEstado = "",
}: RecetaCardProps) {
  const status = getStatusStyles(RecetaEstado);

  return (
    <View style={styles.card}>
      <View style={[styles.accentBar, status.accent]} />

      <View style={styles.cardInner}>
        {/* Header: ID + estado */}
        <View style={styles.headerRow}>
          <Text style={styles.recetaCode}>Receta #{RecetaID}</Text>
          <View style={[styles.statusChip, status.chip]}>
            <View style={[styles.statusDot, status.dot]} />
            <Text style={[styles.statusText, status.text]}>{RecetaEstado}</Text>
          </View>
        </View>

        {/* Doctor y paciente */}
        <Text style={styles.doctorName}>Dr. {DoctorRemitente}</Text>
        <Text style={styles.patientName}>{Paciente}</Text>

        <View style={styles.divider} />

        {/* Fechas */}
        <View style={styles.datesRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Emitida</Text>
            <Text style={styles.dateValue}>{formatDate(FechaEmision)}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Vence</Text>
            <Text style={styles.dateValue}>{formatDate(FechaExpiracion)}</Text>
          </View>
        </View>

        {/* Dosis */}
        <RecetaDosis dosis={Dosis} />
      </View>
    </View>
  );
}
