import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c900,
  },
  item: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  tagPrimary: {
    flex: 1,
    backgroundColor: "#EDF6FB",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.c100,
  },
  tagSoft: {
    flex: 1,
    backgroundColor: "#F1F5FA",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.c100,
  },
  tagLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.c700,
    marginBottom: 4,
  },
  tagValue: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.c900,
  },
  instructions: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.c700,
  },
  emptyText: {
    fontSize: 14,
    color: palette.c700,
  },
});

export default style;
