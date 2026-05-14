import { useThemeColors } from "@/hooks/useThemeColors";
import { EmotionGeneralesCardProps } from "@/types/components/EmotionGeneralesCardProps";
import { Image, Text, View } from "react-native";
import { styles } from "./EmotionGeneralesCard.styles";

export default function EmotionGeneralesCard({
  emotions,
}: EmotionGeneralesCardProps) {
  const colors = useThemeColors();
  {
    emotions.map((emotion) => console.log(emotion));
  }
  return (
    <View style={styles.emotionGrid}>
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
          <Image
            source={{ uri: `http://192.168.1.21:8000/${emotion.imageUrl}` }}
            style={styles.image}
          />

          <Text style={[styles.label, { color: colors.text }]}>
            {emotion.libelle}
          </Text>
        </View>
      ))}
    </View>
  );
}
