import { styles } from "@/components/Emotion/EmotionCard/EmotionCard.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { EmotionCardProps } from "@/types/components/Emotion/EmotionCardProps";
import { Text, View } from "react-native";

export default function EmotionCard({ emotions }: EmotionCardProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.emotionRelated}>
      <Text style={[styles.titleSection, { color: colors.text }]}>
        Émotions associées
      </Text>

      <View style={styles.emotionCards}>
        {emotions.map((emotion) => (
          <View
            key={emotion.id}
            style={[
              styles.emotionCard,
              {
                backgroundColor: colors.bg,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.emotionTitle, { color: colors.text }]}>
              {emotion.libelle}
            </Text>

            <Text style={[styles.emotionDescription, { color: colors.text }]}>
              {emotion.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
