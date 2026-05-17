import { styles } from "@/components/EmotionsSelect/EmotionsSelect.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { EmotionsSelectProps } from "@/types/components/EmotionsSelectProps";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

export default function EmotionsSelect({
  question,
  value,
  emotions,
  onChange,
}: EmotionsSelectProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.text }]}>{question}</Text>

      <View
        style={[
          styles.select,
          {
            borderColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={(e) => onChange(Number(e))}
          style={{ color: colors.text }}
        >
          <Picker.Item label="Choisir" value="" />

          {emotions.map((emotion) => (
            <Picker.Item
              key={emotion.id}
              label={emotion.libelle}
              value={emotion.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
