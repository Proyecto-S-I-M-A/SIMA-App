import AppHeader from "@/components/AppHeader/Component";
import palette from "@/constants/theme";
import { useGetAllMaquinas } from "@/lib/api/QueryMaquina";
import { clearSessionAuth } from "@/lib/GetCookie";
import type { Maquina } from "@/types/Maquina";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

function getMachineLabel(m: Maquina): string {
  return m.ubicacion || `Máquina #${m.id}`;
}

function buildMapHtml(maquinas: Maquina[]): string {
  const validMachines = maquinas.filter(
    (m) => m.latitud !== null && m.longitud !== null
  );
  const markersJson = JSON.stringify(validMachines);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
    .leaflet-popup-content b { color: #1C3549; }
    .machine-popup { font-family: sans-serif; font-size: 13px; line-height: 1.5; }
    .status-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
    }
    .status-active { background: #D1FAE5; color: #065F46; }
    .status-inactive { background: #EEF2F7; color: #4E7899; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: true }).setView([8.9936, -79.5197], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    var machines = ${markersJson};
    var bounds = [];
    var machineMarkers = {};

    machines.forEach(function(m) {
      if (m.latitud !== null && m.longitud !== null) {
        var label = m.ubicacion || ('M\\u00e1quina #' + m.id);
        var statusClass = m.activo ? 'status-active' : 'status-inactive';
        var statusText = m.activo ? 'Activa' : 'Inactiva';
        var popup = '<div class="machine-popup">'
          + '<b>' + label + '</b><br/>'
          + '<span class="status-badge ' + statusClass + '">' + statusText + '</span>'
          + '</div>';
        var marker = L.marker([m.latitud, m.longitud]).addTo(map).bindPopup(popup);
        machineMarkers[m.id] = { marker: marker, lat: m.latitud, lng: m.longitud };
        bounds.push([m.latitud, m.longitud]);
      }
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 15);
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    window.flyToMachine = function(id) {
      var entry = machineMarkers[id];
      if (entry) {
        map.flyTo([entry.lat, entry.lng], 16, { duration: 0.8 });
        setTimeout(function() { entry.marker.openPopup(); }, 900);
      }
    };

    window.resetView = function() {
      if (bounds.length === 1) {
        map.flyTo(bounds[0], 15, { duration: 0.8 });
      } else if (bounds.length > 1) {
        map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
      }
    };
  </script>
</body>
</html>`;
}

export default function UbicacionTab() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const webViewRef = useRef<WebView>(null);

  const { data: maquinas, isLoading, isError } = useGetAllMaquinas();

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await clearSessionAuth();
    } finally {
      router.replace("/");
    }
  };

  const validMachines =
    maquinas?.filter((m) => m.latitud !== null && m.longitud !== null) ?? [];

  const selectedMachine =
    validMachines.find((m) => m.id === selectedId) ?? null;

  const handleSelectMachine = (id: number | null) => {
    setSelectedId(id);
    setDropdownOpen(false);
    if (id === null) {
      webViewRef.current?.injectJavaScript("window.resetView(); true;");
    } else {
      webViewRef.current?.injectJavaScript(
        `window.flyToMachine(${id}); true;`
      );
    }
  };

  const selectLabel = selectedMachine
    ? getMachineLabel(selectedMachine)
    : `Todas las máquinas (${validMachines.length})`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Ubicación de Máquinas"
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onLogout={handleLogout}
      />

      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={palette.c900} />
          <Text style={styles.loadingText}>Cargando máquinas...</Text>
        </View>
      )}

      {isError && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            No se pudo cargar la información de las máquinas.
          </Text>
        </View>
      )}

      {!isLoading && !isError && maquinas && validMachines.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            No hay máquinas con ubicación registrada.
          </Text>
        </View>
      )}

      {!isLoading && !isError && maquinas && validMachines.length > 0 && (
        <>
          {/* Machine selector */}
          <View style={styles.selectorBar}>
            <Pressable
              style={({ pressed }) => [
                styles.selectorButton,
                pressed && styles.selectorButtonPressed,
              ]}
              onPress={() => setDropdownOpen(true)}
            >
              <AntDesign
                name="environment"
                size={16}
                color={selectedMachine ? palette.c900 : palette.c500}
                style={styles.selectorIcon}
              />
              <Text
                style={[
                  styles.selectorLabel,
                  selectedMachine && styles.selectorLabelSelected,
                ]}
                numberOfLines={1}
              >
                {selectLabel}
              </Text>
              <AntDesign name="down" size={12} color={palette.c500} />
            </Pressable>
          </View>

          <WebView
            ref={webViewRef}
            style={styles.map}
            originWhitelist={["*"]}
            source={{ html: buildMapHtml(maquinas) }}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            renderLoading={() => (
              <View style={styles.centered}>
                <ActivityIndicator size="large" color={palette.c900} />
              </View>
            )}
          />

          {/* Dropdown modal */}
          <Modal
            visible={dropdownOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setDropdownOpen(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setDropdownOpen(false)}
            >
              <View style={styles.dropdownMenu}>
                <Text style={styles.dropdownTitle}>Seleccionar máquina</Text>

                <FlatList
                  data={[{ id: null } as { id: number | null }, ...validMachines]}
                  keyExtractor={(item) =>
                    item.id === null ? "all" : String(item.id)
                  }
                  renderItem={({ item }) => {
                    const isAll = item.id === null;
                    const machine = isAll
                      ? null
                      : (item as Maquina);
                    const isSelected = selectedId === item.id;
                    return (
                      <Pressable
                        style={({ pressed }) => [
                          styles.dropdownItem,
                          isSelected && styles.dropdownItemSelected,
                          pressed && styles.dropdownItemPressed,
                        ]}
                        onPress={() => handleSelectMachine(item.id)}
                      >
                        <AntDesign
                          name="environment"
                          size={15}
                          color={isSelected ? palette.c900 : palette.c500}
                        />
                        <View style={styles.dropdownItemContent}>
                          <Text
                            style={[
                              styles.dropdownItemLabel,
                              isSelected && styles.dropdownItemLabelSelected,
                            ]}
                            numberOfLines={1}
                          >
                            {isAll
                              ? "Todas las máquinas"
                              : getMachineLabel(machine!)}
                          </Text>
                          {!isAll && machine && (
                            <Text
                              style={[
                                styles.dropdownItemStatus,
                                machine.activo
                                  ? styles.statusActive
                                  : styles.statusInactive,
                              ]}
                            >
                              {machine.activo ? "Activa" : "Inactiva"}
                            </Text>
                          )}
                        </View>
                        {isSelected && (
                          <AntDesign name="check" size={15} color={palette.c900} />
                        )}
                      </Pressable>
                    );
                  }}
                />
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.c50,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: palette.c500,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 14,
    color: palette.c900,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: palette.c500,
    fontWeight: "600",
    textAlign: "center",
  },
  selectorBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.c50,
    borderBottomWidth: 1,
    borderBottomColor: palette.c200,
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  selectorButtonPressed: {
    backgroundColor: palette.c100,
  },
  selectorIcon: {
    flexShrink: 0,
  },
  selectorLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: palette.c500,
  },
  selectorLabelSelected: {
    color: palette.c900,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  dropdownMenu: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.c500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.c100,
    marginBottom: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
    gap: 12,
  },
  dropdownItemSelected: {
    backgroundColor: palette.c50,
  },
  dropdownItemPressed: {
    backgroundColor: palette.c100,
  },
  dropdownItemContent: {
    flex: 1,
    gap: 2,
  },
  dropdownItemLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.c700,
  },
  dropdownItemLabelSelected: {
    fontWeight: "700",
    color: palette.c900,
  },
  dropdownItemStatus: {
    fontSize: 11,
    fontWeight: "700",
  },
  statusActive: {
    color: "#065F46",
  },
  statusInactive: {
    color: palette.c500,
  },
});