import { Text, View } from "react-native";
import { styles } from "./style";

type FeedbackSuccessProps = {
  title?: string;
  message?: string;
};

export function FeedbackSuccess({
  title = "Cuenta creada",
  message = "Tu cuenta se creo de manera exitosa.",
}: FeedbackSuccessProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>OK</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
