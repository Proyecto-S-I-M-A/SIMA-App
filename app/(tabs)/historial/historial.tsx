import AppHeader from "@/components/AppHeader/Component";
import DataCardHeader from "@/components/DataCardHeader/Component";
import RecetaCard from "@/components/RecetaCard/Component";
import palette from "@/constants/theme";
import useHome from "@/hooks/useHome";
import { useGetClientes } from "@/lib/api/QueryCliente";
import { useGetRecetasYDosisByCedula } from "@/lib/api/QueryReceta";
import { clearSessionAuth, getSessionId } from "@/lib/GetCookie";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistorialTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionID, setSessionID] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadSession = async () => {
        const id = (await getSessionId()) || "";
        if (isActive) {
          setSessionID(id);
        }
      };

      void loadSession();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const { data: cliente } = useGetClientes(sessionID, Boolean(sessionID));
  const { data, refetch } = useGetRecetasYDosisByCedula(
    cliente?.cedula || "",
    Boolean(cliente?.cedula),
  );
  const { CantidadActiva, CantidadRetirada, CantidadReceta } = useHome(data);

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
        <DataCardHeader
          CantidadReceta={CantidadReceta}
          CantidadActiva={CantidadActiva}
          CantidadRetirada={CantidadRetirada}
        />
        {/* <InputSearcher /> */}
        {data?.map((receta) => (
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
        ))}
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
    gap: 16,
  },
});
