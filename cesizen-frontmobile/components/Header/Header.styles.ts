import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    width: "100%",
  },

  banner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  logo: {
    height: 80,
    resizeMode: "contain",
  },

  nav: {
    borderBottomWidth: 1,
  },

  navContainer: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  burger: {
    fontSize: 28,
    padding: 8,
  },

  mobileMenu: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  link: {
    fontSize: 18,
    fontWeight: "500",
  },
});
