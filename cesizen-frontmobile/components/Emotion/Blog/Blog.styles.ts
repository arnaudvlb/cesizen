import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  generalEmotion: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    gap: 24,
    alignItems: "center",
    flexDirection: "column",
  },

  generalEmotionImage: {
    width: 220,
    height: 220,
    borderRadius: 24,
    resizeMode: "contain",
  },

  generalEmotionContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  emotionBadge: {
    backgroundColor: "rgba(235, 113, 37, 0.12)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 40,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 28,
    opacity: 0.9,
    textAlign: "left",
    width: "100%",
  },
});
