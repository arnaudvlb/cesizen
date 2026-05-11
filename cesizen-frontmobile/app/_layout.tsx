import Header from "@/components/Header/Header";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      />
    </View>
  );
}
