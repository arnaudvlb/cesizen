import { useThemeColors } from "@/hooks/useThemeColors";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./Header.styles";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const colors = useThemeColors();

  const goTo = (path: string) => {
    setMenuOpen(false);
    router.push(path as any);
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/logocesizen.png")}
          style={styles.logo}
        />
      </View>

      <View style={[styles.nav, { borderBottomColor: colors.border }]}>
        <View style={styles.navContainer}>
          <Pressable
            style={styles.burger}
            onPress={() => setMenuOpen((prev) => !prev)}
          >
            <Text style={{ color: colors.text }}>☰</Text>
          </Pressable>
        </View>

        {menuOpen && (
          <View style={[styles.mobileMenu, { borderTopColor: colors.border }]}>
            <Link href="/" style={[styles.link, { color: colors.text }]}>
              Accueil
            </Link>

            <Link href="/login" style={[styles.link, { color: colors.text }]}>
              Connexion
            </Link>
          </View>
        )}
      </View>
    </View>
  );
}
