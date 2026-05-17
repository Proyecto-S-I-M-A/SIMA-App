import palette from "@/constants/theme";
import { useCreateAccesoMutation } from "@/lib/api/QueryAcceso";
import { saveSessionAuth } from "@/lib/GetCookie";
import { useCreateClienteMutation, useSignupMutation } from "@/lib/Query";
import { SignUpCreation, SignUpSchema } from "@/types/SingUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOGIN_ROUTE = "/" as Href;
const SEX_OPTIONS = [
  { label: "Masculino", value: "M" },
  { label: "Femenino", value: "F" },
] as const;

export default function RegisterScreen() {
  const router = useRouter();
  const [isBusy] = useState(false);

  // SingUp Logic 
  const {mutateAsync: SingUp, isSuccess} = useSignupMutation();
  const {mutateAsync: CreateAcceso} = useCreateAccesoMutation();
  const {mutateAsync: CreateCliente} = useCreateClienteMutation();

  const {
      control,
      handleSubmit,
      formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      nombre: "",
      apellido: "",
      cedula: "",
      aseguradora: false,
      sexo: undefined,
    },
  })
  const onSubmit = async (data: SignUpCreation) => {
    try{
      const SignUpResponse = await SingUp ({email: data.email, password: data.password});
      if(isSuccess) {
        await saveSessionAuth(SignUpResponse.session.access_token, SignUpResponse.session.refresh_token || "", SignUpResponse.session.user.id);
      }
      await CreateAcceso({
        id: SignUpResponse.session?.user.id || "",
        correo: data.email,
        usuario: data.email,
        tipo: "paciente",
        ultimo_acceso: new Date(),
        activo: true
      });
      await CreateCliente({
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        sexo: data.sexo,
        asegurado: data.aseguradora,
        id_acceso: SignUpResponse.session?.user.id || "",
        verificado: false
      })
    }
    catch (error) {
      console.error("Error en SingUp:", error);
      return;
    }
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
              onPress={() => router.replace(LOGIN_ROUTE)}
            >
              <Text style={styles.backButtonText}>Volver</Text>
            </Pressable>
            <Text style={styles.caption}>Registro de usuario</Text>
            <Text style={styles.title}>Crea tu cuenta</Text>
            <Text style={styles.subtitle}>
              Completa los datos para empezar a usar el sistema.
            </Text>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Nombre</Text>
              <Controller
                control={control}
                name="nombre"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.nombre && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Nombre"
                    placeholderTextColor={palette.c700}
                  />
                )}
              />
              {errors.nombre ? (
                <Text style={styles.errorText}>{errors.nombre.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Apellido</Text>
              <Controller
                control={control}
                name="apellido"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.apellido && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Apellido"
                    placeholderTextColor={palette.c700}
                  />
                )}
              />
              {errors.apellido ? (
                <Text style={styles.errorText}>{errors.apellido.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Cedula</Text>
              <Controller
                control={control}
                name="cedula"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.cedula && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Documento"
                    placeholderTextColor={palette.c700}
                  />
                )}
              />
              {errors.cedula ? (
                <Text style={styles.errorText}>{errors.cedula.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Correo</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="usuario@empresa.com"
                    placeholderTextColor={palette.c700}
                  />
                )}
              />
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Contrasena</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholder="Minimo 6 caracteres"
                    placeholderTextColor={palette.c700}
                  />
                )}
              />
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Sexo</Text>
              <Controller
                control={control}
                name="sexo"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.segmentedControl}>
                    {SEX_OPTIONS.map((option) => {
                      const isSelected = value === option.value;
                      return (
                        <Pressable
                          key={option.value}
                          style={({ pressed }) => [
                            styles.segmentedOption,
                            isSelected && styles.segmentedOptionActive,
                            errors.sexo && styles.segmentedOptionError,
                            pressed && styles.segmentedOptionPressed,
                          ]}
                          onPress={() => onChange(option.value)}
                        >
                          <Text
                            style={
                              isSelected
                                ? styles.segmentedOptionTextActive
                                : styles.segmentedOptionText
                            }
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              />
              {errors.sexo ? (
                <Text style={styles.errorText}>{errors.sexo.message}</Text>
              ) : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Aseguradora</Text>
              <Controller
                control={control}
                name="aseguradora"
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      styles.switchRow,
                      errors.aseguradora && styles.switchRowError,
                    ]}
                  >
                    <Text style={styles.switchLabel}>
                      {value ? "Si" : "No"}
                    </Text>
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{
                        false: palette.c200,
                        true: palette.c500,
                      }}
                      thumbColor={palette.white}
                    />
                  </View>
                )}
              />
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
                (isBusy) && styles.primaryButtonDisabled,
              ]}
              disabled={isBusy}
              onPress={handleSubmit(onSubmit)}
            >
              {isBusy ? (
                <ActivityIndicator color={palette.white} />
              ) : (
                <Text style={styles.primaryButtonText}>Crear cuenta</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  bgOrbTop: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: palette.c200,
    opacity: 0.45,
    top: -80,
    right: -50,
  },
  bgOrbBottom: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: palette.c100,
    opacity: 0.65,
    bottom: -90,
    left: -80,
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
  backButton: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.c200,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backButtonPressed: {
    backgroundColor: palette.c50,
  },
  backButtonText: {
    color: palette.c700,
    fontWeight: "700",
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
  inputError: {
    borderColor: palette.danger,
  },
  errorText: {
    color: palette.danger,
    fontSize: 13,
  },
  segmentedControl: {
    flexDirection: "row",
    gap: 8,
  },
  segmentedOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.c300,
    alignItems: "center",
  },
  segmentedOptionActive: {
    backgroundColor: palette.c100,
    borderColor: palette.c500,
  },
  segmentedOptionError: {
    borderColor: palette.danger,
  },
  segmentedOptionPressed: {
    backgroundColor: palette.c50,
  },
  segmentedOptionText: {
    color: palette.c700,
    fontWeight: "600",
  },
  segmentedOptionTextActive: {
    color: palette.c900,
    fontWeight: "700",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: palette.c300,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.white,
  },
  switchRowError: {
    borderColor: palette.danger,
  },
  switchLabel: {
    color: palette.c700,
    fontWeight: "700",
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: palette.c500,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  primaryButtonPressed: {
    backgroundColor: palette.c700,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 16,
  },
});
