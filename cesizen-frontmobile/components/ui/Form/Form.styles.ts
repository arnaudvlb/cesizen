import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* =====================
     AUTH CARD
  ===================== */

  formCard: {
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

  formTitle: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },

  /* =====================
     FORM
  ===================== */

  formForm: {
    flexDirection: "column",
    gap: 20,
  },

  formGroup: {
    flexDirection: "column",
    gap: 6,
  },

  formTextarea: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,

    textAlignVertical: "top",
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
