import Blog from "@/components/Emotion/Blog/Blog";
import EmotionCard from "@/components/Emotion/EmotionCard/EmotionCard";
import { useEmotionGenerale } from "@/hooks/emotionGenerales/useEmotionGenerale";
import { useEmotionsByEmotionGenerale } from "@/hooks/emotions/useEmotionsByEmotionGenerale";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function EmotionDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    emotionGenerale,
    loading: loadingEmotionGenerale,
    error: errorEmotionGenerale,
  } = useEmotionGenerale(id);

  const {
    emotions,
    loading: loadingEmotions,
    error: errorEmotions,
  } = useEmotionsByEmotionGenerale(id);

  if (loadingEmotionGenerale || loadingEmotions) {
    return <Text>Chargement...</Text>;
  }

  if (errorEmotionGenerale || errorEmotions || !emotionGenerale || !emotions) {
    return <Text>Erreur lors du chargement.</Text>;
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
      <Blog emotionGenerale={emotionGenerale} />
      <EmotionCard emotions={emotions} />
    </ScrollView>
  );
}
