import palette from "@/constants/theme";
import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    recipeCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.c100,
    shadowColor: "#1C3549",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    gap: 14,
  },
  recipeCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  recipeCode: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c500,
    marginBottom: 4,
  },
  recipeDoctor: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.c900,
  },
  statusChipActive: {
    backgroundColor: "#DDF1EA",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusChipPending: {
    backgroundColor: "#E6EEF8",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "800",
    color: palette.c900,
  },
  metaGrid: {
    flexDirection: "row",
    gap: 12,
  },
  metaItem: {
    flex: 1,
    backgroundColor: palette.c50,
    borderRadius: 16,
    padding: 12,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.c700,
    marginBottom: 6,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.c900,
  },
  doseBlock: {
    gap: 10,
  },
  doseTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c900,
  },
  doseRow: {
    flexDirection: "row",
    gap: 10,
  },
  doseTagPrimary: {
    flex: 1,
    backgroundColor: "#EDF6FB",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.c100,
  },
  doseTagSoft: {
    flex: 1,
    backgroundColor: "#F1F5FA",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.c100,
  },
  doseTagAccent: {
    flex: 1,
    backgroundColor: "#E8F2F7",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.c100,
  },
  doseTagLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.c700,
    marginBottom: 4,
  },
  doseTagValue: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c900,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.c700,
  },
})

export default style;