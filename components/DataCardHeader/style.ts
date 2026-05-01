import palette from "@/constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: palette.c100,
    shadowColor: "#1C3549",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    gap: 14,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
 headerTextBlock: {
    flex: 1,
  },
  headerBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: palette.c100,
    alignItems: "center",
    justifyContent: "center",
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: palette.c500,
    marginBottom: 6,
  },
  title: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "800",
    color: palette.c900,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.c700,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statPillDark: {
    flex: 1,
    backgroundColor: palette.c900,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statPillSoft: {
    flex: 1,
    backgroundColor: palette.c100,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statPillAccent: {
    flex: 1,
    backgroundColor: "#E4F0F7",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statNumberDark: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.white,
  },
  statLabelDark: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.c100,
    marginTop: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.c900,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.c700,
    marginTop: 2,
  },
})

export default styles;