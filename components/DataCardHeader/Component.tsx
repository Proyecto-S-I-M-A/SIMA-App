import palette from "@/constants/theme";
import Entypo from '@expo/vector-icons/Entypo';
import { Text, View } from "react-native";
import styles from "./style";

export default function DataCardHeader() {
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
              <Text style={styles.statNumberDark}>08</Text>
              <Text style={styles.statLabelDark}>Recetas</Text>
            </View>
            <View style={styles.statPillSoft}>
              <Text style={styles.statNumber}>03</Text>
              <Text style={styles.statLabel}>Activas</Text>
            </View>
            <View style={styles.statPillAccent}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Dosis</Text>
            </View>
          </View>
        </View>
  )
}