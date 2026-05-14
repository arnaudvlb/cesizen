import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, View } from "react-native";

export default function Home() {
  const colors = useThemeColors();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.text }}>
        Accueil
      </Text>
    </View>
  );
}
