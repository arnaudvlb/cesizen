import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { Text, View } from "react-native";

export default function Home() {
  const colors = useThemeColors();
  return (
    <View style={globalStyles.page}>
      <Text style={[globalStyles.pageTitle, { color: colors.text }]}>
        Accueil
      </Text>
    </View>
  );
}
