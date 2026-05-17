import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.c100,
    backgroundColor: palette.white,
    gap: 6,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.c100,
  },
  badgeText: {
    color: palette.c900,
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
