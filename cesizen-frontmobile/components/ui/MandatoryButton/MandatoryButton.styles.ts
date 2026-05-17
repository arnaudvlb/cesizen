import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderRadius: 14,

    paddingVertical: 14,
    paddingHorizontal: 20,

    marginTop: 24,

    alignItems: "center",
    justifyContent: "center",

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,

    elevation: 4,
  },

  disabled: {
    opacity: 0.5,
  },
});
