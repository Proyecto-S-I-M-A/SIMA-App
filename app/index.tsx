import { getAccessToken, getRefreshToken, getSessionId, saveSessionAuth } from "@/lib/GetCookie";
import { useLoginMutation } from "@/lib/Query";
import { LoginSchema, type LoginData } from "@/types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const palette = {
  c50: "#EFF6FB",
  c100: "#D5E6F1",
  c300: "#A8C7DB",
  c500: "#72A0C1",
  c700: "#4E7899",
  c900: "#1C3549",
  white: "#FFFFFF",
  danger: "#B94040",
};

const AUTH_HOME_ROUTE = "/(tabs)/home" as Href;

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [booting, setBooting] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useFocusEffect(() => {
    async function logTokens() {
      console.log(await getSessionId());
      console.log(await getAccessToken());
      console.log(await getRefreshToken());
    }
    void logTokens();
  });
 // Efecto para restaurar sesión al iniciar la app
  useEffect(() => {
    const restoreSession = async () => {
      const token = await getAccessToken();
      if (token) {
        router.replace(AUTH_HOME_ROUTE);
      }
      setBooting(false);
    };

    void restoreSession();
  }, [router]);

  const isBusy = useMemo(() => isSubmitting || loginMutation.isPending || booting, [isSubmitting, loginMutation.isPending, booting]);

  const onSubmit = async (values: LoginData) => {
    const response = await loginMutation.mutateAsync(values);
    const accessToken = response.session?.access_token;
    const refreshToken = response.session?.refresh_token ?? response.session?.token_refresh;
    const sessionId = response.session?.user.id ?? ""
    if (!accessToken || !refreshToken) {
      throw new Error("La API no devolvio tokens validos");
    }

    await saveSessionAuth({
      accessToken,
      refreshToken,
      sessionId,
    });

    router.replace(AUTH_HOME_ROUTE);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.caption}>Sistema Inteligente Medicacion Asistida</Text>
          <Text style={styles.title}>Inicia sesion</Text>
          <Text style={styles.subtitle}>Accede con tu correo y contrasena para administrar tu operacion.</Text>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Correo</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="usuario@empresa.com"
                  placeholderTextColor={palette.c700}
                />
              )}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email.message}</Text> : null}
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Contrasena</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  placeholder="Minimo 6 caracteres"
                  placeholderTextColor={palette.c700}
                />
              )}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password.message}</Text> : null}
          </View>

          {loginMutation.error ? <Text style={styles.errorText}>{loginMutation.error.message}</Text> : null}

          <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && styles.loginButtonPressed, isBusy && styles.loginButtonDisabled]}
            disabled={isBusy}
            onPress={handleSubmit(onSubmit)}
          >
            {isBusy ? <ActivityIndicator color={palette.white} /> : <Text style={styles.loginButtonText}>Entrar</Text>}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.c50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  bgOrbTop: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: palette.c300,
    opacity: 0.4,
    top: -90,
    right: -60,
  },
  bgOrbBottom: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: palette.c100,
    opacity: 0.7,
    bottom: -90,
    left: -70,
  },
  card: {
    backgroundColor: palette.white,
    borderRadius: 22,
    padding: 22,
    gap: 14,
    borderWidth: 1,
    borderColor: palette.c100,
    shadowColor: "#153347",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  caption: {
    fontSize: 13,
    color: palette.c700,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    color: palette.c900,
    fontWeight: "800",
  },
  subtitle: {
    color: palette.c700,
    lineHeight: 20,
  },
  fieldBlock: {
    gap: 8,
  },
  label: {
    color: palette.c900,
    fontWeight: "700",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.c300,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: palette.c900,
    backgroundColor: palette.white,
  },
  errorText: {
    color: palette.danger,
    fontSize: 13,
  },
  loginButton: {
    marginTop: 8,
    backgroundColor: palette.c500,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  loginButtonPressed: {
    backgroundColor: palette.c700,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 16,
  },
});
