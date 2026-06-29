import palette from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import styles from "./style";

interface AppHeaderProps {
  title?: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onLogout: () => void;
}

export default function AppHeader({
  title = "",
  menuOpen,
  onMenuToggle,
  onLogout,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.profileMenuWrap}>
        <Pressable
          onPress={onMenuToggle}
          style={({ pressed }) => [
            styles.profileButton,
            pressed && styles.profileButtonPressed,
          ]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Perfil"
        >
          <MaterialIcons name="person" size={22} color={palette.c900} />
        </Pressable>
        {menuOpen ? (
          <View style={styles.tooltip}>
            <Pressable
              onPress={onLogout}
              style={({ pressed }) => [
                styles.logoutButton,
                pressed && styles.logoutButtonPressed,
              ]}
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
  );
}