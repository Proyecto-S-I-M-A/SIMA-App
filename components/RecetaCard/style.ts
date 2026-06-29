import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.c100,
    overflow: "hidden",
    shadowColor: palette.c900,
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  accentBar: {
    height: 4,
    width: "100%",
  },
  accentPending: { backgroundColor: palette.pendingAccent },
  accentActive: { backgroundColor: palette.activeAccent },
  accentRetirada: { backgroundColor: palette.retiredAccent },

  cardInner: {
    padding: 16,
    gap: 12,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recetaCode: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.c500,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  // Status chip
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusChipPending: { backgroundColor: palette.pendingBg },
  statusChipActive: { backgroundColor: palette.activeBg },
  statusChipRetirada: { backgroundColor: palette.retiredBg },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotPending: { backgroundColor: palette.pendingAccent },
  statusDotActive: { backgroundColor: palette.activeAccent },
  statusDotRetirada: { backgroundColor: palette.retiredAccent },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  statusTextPending: { color: palette.pendingText },
  statusTextActive: { color: palette.activeText },
  statusTextRetirada: { color: palette.retiredText },

  // Doctor y paciente
  doctorName: {
    fontSize: 17,
    fontWeight: "800",
    color: palette.c900,
    marginTop: -4,
  },
  patientName: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.c700,
    marginTop: -6,
  },

  divider: {
    height: 1,
    backgroundColor: palette.c100,
  },

  // Fechas
  datesRow: {
    flexDirection: "row",
    gap: 10,
  },
  dateItem: {
    flex: 1,
    backgroundColor: palette.c50,
    borderRadius: 12,
    padding: 10,
    gap: 3,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.c500,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.c900,
  },
});

export default styles;
