import { styles } from "@/components/Emotion/Blog/Blog.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { BlogProps } from "@/types/components/Emotion/BlogProps";
import { Image, Text, View } from "react-native";

export default function Blog({ emotionGenerale }: BlogProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.generalEmotion,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      <Image
        source={{
          uri: `http://192.168.1.21:8000${emotionGenerale.imageUrl}`,
        }}
        style={styles.generalEmotionImage}
      />

      <View style={styles.generalEmotionContent}>
        <Text
          style={[
            styles.emotionBadge,
            {
              color: colors.primary,
            },
          ]}
        >
          Émotion générale
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {emotionGenerale.libelle}
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: colors.text,
            },
          ]}
        >
          {emotionGenerale.description}
        </Text>
      </View>
    </View>
  );
}
