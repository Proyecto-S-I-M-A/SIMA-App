import palette from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: palette.c50Translucent,
    position: "relative",
    overflow: "visible",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: palette.c900,
  },
  profileMenuWrap: {
    position: "relative",
    zIndex: 12,
    elevation: 12,
  },
  profileButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c100,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: palette.c900,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  profileButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  tooltip: {
    position: "absolute",
    right: 0,
    top: 46,
    width: 160,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.c100,
    borderRadius: 12,
    padding: 8,
    zIndex: 15,
    elevation: 15,
    ...Platform.select({
      ios: {
        shadowColor: palette.c900,
        shadowOpacity: 0.14,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
    }),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  logoutButtonPressed: {
    backgroundColor: palette.c100,
  },
  logoutText: {
    color: palette.c900,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;