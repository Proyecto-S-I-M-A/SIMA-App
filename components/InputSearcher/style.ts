import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({ 
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: palette.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.c100,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  searchPlaceholder: {
    color: palette.c700,
    fontSize: 14,
  },})

export default style;