import { styles } from "@/components/ui/MandatoryButton/MandatoryButton.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MandatoryButtonProps } from "@/types/components/ui/MandatoryButtonProps";
import { Pressable, Text, View } from "react-native";

export default function MandatoryButton({
  disabled,
  onClick,
  buttonText,
}: MandatoryButtonProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onClick}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.primary,
          },
          disabled && styles.disabled,
          pressed && !disabled && { opacity: 0.85 },
          pressed && !disabled && { transform: [{ scale: 0.98 }] },
        ]}
      >
        <Text style={{ color: colors.text }}>{buttonText}</Text>
      </Pressable>
    </View>
  );
}
