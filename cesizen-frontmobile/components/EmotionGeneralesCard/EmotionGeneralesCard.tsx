import { useThemeColors } from "@/hooks/useThemeColors";
import { EmotionGeneralesCardProps } from "@/types/components/EmotionGeneralesCardProps";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import { styles } from "./EmotionGeneralesCard.styles";

export default function EmotionGeneralesCard({
  emotions,
}: EmotionGeneralesCardProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.emotionGrid}>
      {emotions.map((emotion) => (
        <Link
          key={emotion.id}
          href={{ pathname: "/emotion/[id]", params: { id: emotion.id } }}
        >
          <View
            style={[
              styles.emotionCard,
              {
                backgroundColor: colors.bg,
                borderColor: colors.border,
              },
            ]}
          >
            <Image
              source={{ uri: `http://192.168.1.21:8000${emotion.imageUrl}` }}
              style={styles.image}
            />

            <Text style={[styles.label, { color: colors.text }]}>
              {emotion.libelle}
            </Text>
          </View>
        </Link>
      ))}
    </View>
  );
}
