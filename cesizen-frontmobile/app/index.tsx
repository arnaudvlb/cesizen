import { useThemeColors } from "@/hooks/useThemeColors";
import { homeStyles } from "@/styles/home";
import { Link } from "expo-router";
import { ImageBackground, Text, View } from "react-native";

export default function Home() {
  const colors = useThemeColors();
  return (
    <ImageBackground
      source={require("../assets/images/wallpaper.jpg")}
      style={homeStyles.container}
      resizeMode="cover"
    >
      <View style={homeStyles.overlay} />

      <View style={homeStyles.content}>
        <Text style={[homeStyles.title, { color: colors.bg }]}>
          Bienvenue sur CESIZen
        </Text>

        <View style={homeStyles.buttons}>
          <Link
            href="/emotions"
            style={[homeStyles.button, { backgroundColor: colors.bg }]}
          >
            <Text style={[homeStyles.buttonText, { color: colors.text }]}>
              Découvrez les émotions
            </Text>
          </Link>

          <Link
            href="/login"
            style={[homeStyles.button, { backgroundColor: colors.bg }]}
          >
            <Text style={[homeStyles.buttonText, { color: colors.text }]}>
              Connectez-vous
            </Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}
