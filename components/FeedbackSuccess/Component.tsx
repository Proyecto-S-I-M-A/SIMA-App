import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./style";

type FeedbackSuccessProps = {
  visible: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
};

export function FeedbackSuccess({
  visible,
  title = "Cuenta creada",
  message = "Tu cuenta se creo de manera exitosa.",
  onClose,
}: FeedbackSuccessProps) {
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
            <Text style={styles.badgeText}>OK</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}
