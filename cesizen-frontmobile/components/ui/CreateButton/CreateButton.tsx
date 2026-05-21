import { useThemeColors } from "@/hooks/useThemeColors";
import { CreateButtonProps } from "@/types/components/ui/CreateButtonProps";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./CreateButton.styles";

export default function CreateButton({ url }: CreateButtonProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.buttonContainer}>
      <Link
        href={url}
        style={[
          styles.button,
          { backgroundColor: colors.bg, borderColor: colors.primary },
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>+</Text>
      </Link>
    </View>
  );
}
