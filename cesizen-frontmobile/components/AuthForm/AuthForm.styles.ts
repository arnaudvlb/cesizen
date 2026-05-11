import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* =====================
     AUTH CARD
  ===================== */

  authCard: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    padding: 32,

    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },

    elevation: 5,
  },

  /* =====================
     TITLES
  ===================== */

  authTitle: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },

  /* =====================
     FORM
  ===================== */

  authForm: {
    flexDirection: "column",
    gap: 20,
  },

  formGroup: {
    flexDirection: "column",
    gap: 6,
  },

  /* =====================
     FOOTER
  ===================== */

  authFooter: {
    marginTop: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
});
