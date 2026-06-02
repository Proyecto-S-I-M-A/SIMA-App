import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  selectorBar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.c50,
    borderBottomWidth: 1,
    borderBottomColor: palette.c200,
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  selectorButtonPressed: {
    backgroundColor: palette.c100,
  },
  selectorIcon: {
    flexShrink: 0,
  },
  selectorLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: palette.c500,
  },
  selectorLabelSelected: {
    color: palette.c900,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  dropdownMenu: {
    backgroundColor: palette.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.c500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.c100,
    marginBottom: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
    gap: 12,
  },
  dropdownItemSelected: {
    backgroundColor: palette.c50,
  },
  dropdownItemPressed: {
    backgroundColor: palette.c100,
  },
  dropdownItemContent: {
    flex: 1,
    gap: 2,
  },
  dropdownItemLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.c700,
  },
  dropdownItemLabelSelected: {
    fontWeight: "700",
    color: palette.c900,
  },
  dropdownItemStatus: {
    fontSize: 11,
    fontWeight: "700",
  },
  statusActive: {
    color: "#065F46",
  },
  statusInactive: {
    color: palette.c500,
  },
});