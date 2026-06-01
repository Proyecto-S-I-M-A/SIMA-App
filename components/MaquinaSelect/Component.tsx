import palette from "@/constants/theme";
import type { Maquina } from "@/types/Maquina";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import styles from "./style";

export function getMachineLabel(m: Maquina): string {
  return m.ubicacion || `Máquina #${m.id}`;
}

interface MaquinaSelectProps {
  maquinas: Maquina[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function MaquinaSelect({
  maquinas,
  selectedId,
  onSelect,
}: MaquinaSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedMachine = maquinas.find((m) => m.id === selectedId) ?? null;

  const selectLabel = selectedMachine
    ? getMachineLabel(selectedMachine)
    : `Todas las máquinas (${maquinas.length})`;

  const handleSelect = (id: number | null) => {
    setDropdownOpen(false);
    onSelect(id);
  };

  return (
    <>
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
              data={[{ id: null } as { id: number | null }, ...maquinas]}
              keyExtractor={(item) =>
                item.id === null ? "all" : String(item.id)
              }
              renderItem={({ item }) => {
                const isAll = item.id === null;
                const machine = isAll ? null : (item as Maquina);
                const isSelected = selectedId === item.id;

                return (
                  <Pressable
                    style={({ pressed }) => [
                      styles.dropdownItem,
                      isSelected && styles.dropdownItemSelected,
                      pressed && styles.dropdownItemPressed,
                    ]}
                    onPress={() => handleSelect(item.id)}
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
                        {isAll ? "Todas las máquinas" : getMachineLabel(machine!)}
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
  );
}