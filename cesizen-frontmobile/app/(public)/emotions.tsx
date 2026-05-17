import EmotionGeneralesCard from "@/components/EmotionGeneralesCard/EmotionGeneralesCard";
import { useEmotionGenerales } from "@/hooks/emotionGenerales/useEmotionGenerales";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { ScrollView, Text } from "react-native";

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
    <ScrollView
      style={[globalStyles.page, { flex: 1 }]}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >
      <Text
        style={[
          {
            color: colors.text,
          },
          globalStyles.pageTitle,
        ]}
      >
        Émotions
      </Text>
      <EmotionGeneralesCard emotions={emotionGenerales} />
    </ScrollView>
  );
}
