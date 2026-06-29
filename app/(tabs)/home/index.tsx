import AppHeader from "@/components/AppHeader/Component";
import RecetaCard from "@/components/RecetaCard/Component";
import palette from "@/constants/theme";
import { useGetClientes } from "@/lib/api/QueryCliente";
import { useGetRecetasYDosisByCedula } from "@/lib/api/QueryReceta";
import { clearSessionAuth, getSessionId } from "@/lib/GetCookie";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionID, setSessionID] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadSession = async () => {
        const id = (await getSessionId()) || "";
        if (isActive) setSessionID(id);
      };

      void loadSession();
      return () => { isActive = false; };
    }, []),
  );

  const { data: cliente } = useGetClientes(sessionID, Boolean(sessionID));
  const { data, refetch } = useGetRecetasYDosisByCedula(
    cliente?.cedula || "",
    Boolean(cliente?.cedula),
  );
  const recetasPendientes = data?.filter((r) => r.estado === "Pendiente") ?? [];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await clearSessionAuth();
    } finally {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onLogout={handleLogout}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setMenuOpen(false)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Saludo */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingLabel}>Bienvenido</Text>
          <Text style={styles.greetingName}>
            {cliente?.nombre ?? "Usuario"}
          </Text>
        </View>

        {/* Recetas pendientes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recetas pendientes</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{recetasPendientes.length}</Text>
          </View>
        </View>

        {recetasPendientes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tienes recetas pendientes</Text>
          </View>
        ) : (
          recetasPendientes.map((receta) => (
            <RecetaCard
              key={receta.id}
              RecetaID={receta.id}
              DoctorRemitente={receta.doctor_remitente || ""}
              Paciente={cliente?.nombre + " " + cliente?.apellido}
              FechaEmision={receta.createdAt}
              Dosis={receta.dosis}
              FechaExpiracion={receta.fecha}
              RecetaEstado={receta.estado || ""}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.c50,
  },
  scrollView: {
    zIndex: 0,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 14,
  },
  greetingBlock: {
    gap: 2,
    marginBottom: 4,
  },
  greetingLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.c500,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  greetingName: {
    fontSize: 26,
    fontWeight: "800",
    color: palette.c900,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: palette.c900,
  },
  sectionBadge: {
    backgroundColor: palette.pendingBg,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: palette.pendingText,
  },
  emptyState: {
    backgroundColor: palette.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.c100,
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: palette.c500,
    fontWeight: "600",
  },
});