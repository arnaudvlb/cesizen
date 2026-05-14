import EmotionGeneralesCard from "@/components/EmotionGeneralesCard/EmotionGeneralesCard";
import { useEmotionGenerales } from "@/hooks/useEmotionGenerales";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, View } from "react-native";

export default function EmotionsPage() {
  const { emotionGenerales, loading, error } = useEmotionGenerales();
  const colors = useThemeColors();

  if (loading) {
    return <Text style={{ color: colors.text }}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={{ color: colors.text }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
          color: colors.text,
        }}
      >
        Émotions
      </Text>
      <EmotionGeneralesCard emotions={emotionGenerales} />
    </View>
  );
}
