import { useThemeColors } from "@/hooks/useThemeColors";
import { Pressable, Text } from "react-native";
import { styles } from "./Button.styles";

type ButtonProps = {
  text: string;
  onPress?: () => void;
};

export default function Button({ text, onPress }: ButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btnPrimary,
        {
          backgroundColor: colors.primary,
        },
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
