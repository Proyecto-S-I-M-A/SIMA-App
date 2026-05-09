import DataCardHeader from "@/components/DataCardHeader/Component";
import InputSearcher from "@/components/InputSearcher/Component";
import RecetaCard from "@/components/RecetaCard/Component";
import palette from "@/constants/theme";
import useHome from "@/hooks/useHome";
import { useGetClientes } from "@/lib/api/QueryCliente";
import { useGetRecetasYDosisByCedula } from "@/lib/api/QueryReceta";
import { clearSessionAuth, getSessionId } from "@/lib/GetCookie";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionID, setSessionID] = useState<string>("");
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
    }, [])
  );
  const { data: cliente } = useGetClientes(sessionID, Boolean(sessionID)); 
  const { data } = useGetRecetasYDosisByCedula(cliente?.cedula || "", Boolean(cliente?.cedula));
  const {CantidadActiva, CantidadRetirada, CantidadReceta} = useHome(data)
 
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inicio</Text>
        <View style={styles.profileMenuWrap}>
          <Pressable
            onPress={() => setMenuOpen((prev) => !prev)}
            style={({ pressed }) => [styles.profileButton, pressed && styles.profileButtonPressed]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Perfil"
          >
            <MaterialIcons name="person" size={22} color={palette.c900} />
          </Pressable>
          {menuOpen ? (
            <View style={styles.tooltip}>
              <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
                accessibilityRole="button"
                accessibilityLabel="Cerrar sesión"
              >
                <MaterialIcons name="logout" size={18} color={palette.c900} />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setMenuOpen(false)}
      >
        <DataCardHeader CantidadReceta={CantidadReceta} CantidadActiva={CantidadActiva} CantidadRetirada={CantidadRetirada} />
        <InputSearcher />
        <RecetaCard />
        <RecetaCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.c50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: palette.c50,
    position: "relative",
    overflow: "visible",
    zIndex: 10,
    elevation: 10,
  },
    scrollView: {
      zIndex: 0,
    },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: palette.c900,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 16,
  },
  profileMenuWrap: {
    position: "relative",
    zIndex: 12,
    elevation: 12,
  },
  profileButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c100,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: palette.c900,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  profileButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  tooltip: {
    position: "absolute",
    right: 0,
    top: 46,
    width: 160,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c100,
    borderRadius: 12,
    padding: 8,
    zIndex: 15,
    elevation: 15,
    ...Platform.select({
      ios: {
        shadowColor: palette.c900,
        shadowOpacity: 0.14,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  logoutButtonPressed: {
    backgroundColor: palette.c100,
  },
  logoutText: {
    color: palette.c900,
    fontSize: 14,
    fontWeight: "600",
  },
});
