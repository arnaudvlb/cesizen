import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 62,
    height: 62,
    marginTop: 10,

    borderRadius: 31,
    borderWidth: 1,

    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.2,
    shadowRadius: 18,

    elevation: 4,
  },

  buttonText: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    includeFontPadding: false,
    lineHeight: 40,
  },
});
