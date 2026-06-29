import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./style";

type FeedbackErrorProps = {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
};

export function FeedbackError({
  visible,
  title = "Cuenta existente",
  message = "Ya existe una cuenta con este correo.",
  onClose,
}: FeedbackErrorProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.container}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>!</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}
