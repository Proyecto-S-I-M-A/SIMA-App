import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(28, 53, 73, 0.35)",
  },
  container: {
    width: "86%",
    maxWidth: 360,
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.danger,
    backgroundColor: palette.c50,
    gap: 6,
    shadowColor: "#153347",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.danger,
  },
  badgeText: {
    color: palette.white,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.c900,
  },
  message: {
    color: palette.c700,
    textAlign: "center",
  },
});
