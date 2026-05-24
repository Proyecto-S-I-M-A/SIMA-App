import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c900,
  },

  // Cada dosis en su propia tarjeta
  itemCard: {
    backgroundColor: palette.c50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.c100,
    padding: 12,
    gap: 10,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  indexBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.c900,
    alignItems: "center",
    justifyContent: "center",
  },
  indexBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: palette.white,
  },
  medicamentoName: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.c900,
    flex: 1,
  },
  cantidadChip: {
    backgroundColor: palette.c100,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  cantidadText: {
    fontSize: 12,
    fontWeight: "800",
    color: palette.c700,
  },

  // Instrucciones destacadas
  instructionsBlock: {
    backgroundColor: palette.white,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: palette.c500,
    paddingVertical: 8,
    paddingRight: 10,
    paddingLeft: 10,
    gap: 3,
  },
  instructionsLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: palette.c500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  instructionsText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: palette.c900,
  },

  emptyText: {
    fontSize: 14,
    color: palette.c700,
  },
});

export default style;
