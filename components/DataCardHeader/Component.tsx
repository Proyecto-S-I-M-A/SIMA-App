import palette from "@/constants/theme";
import Entypo from '@expo/vector-icons/Entypo';
import { Text, View } from "react-native";
import styles from "./style";

interface DataCardHeaderProps {
  CantidadReceta: number
  CantidadActiva: number
  CantidadRetirada: number
}

export default function DataCardHeader({ CantidadReceta, CantidadActiva, CantidadRetirada }: DataCardHeaderProps) {
  return (
           <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerTextBlock}>
              <Text style={styles.kicker}>Farmacia / Recetas</Text>
              <Text style={styles.title}>Mis recetas médicas</Text>
            </View>
            <View style={styles.headerBadge}>
              <Entypo name="text" size={20} color={palette.c900} />
            </View>
          </View>

          <Text style={styles.subtitle}>
            Consulta tus prescripciones activas y la dosis indicada por cada tratamiento.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statPillDark}>
              <Text style={styles.statNumberDark}>{CantidadReceta}</Text>
              <Text style={styles.statLabelDark}>Recetas</Text>
            </View>
            <View style={styles.statPillSoft}>
              <Text style={styles.statNumber}>{CantidadActiva}</Text>
              <Text style={styles.statLabel}>Activas</Text>
            </View>
            <View style={styles.statPillAccent}>
              <Text style={styles.statNumber}>{CantidadRetirada}</Text>
              <Text style={styles.statLabel}>Retiradas</Text>
            </View>
          </View>
        </View>
  )
}