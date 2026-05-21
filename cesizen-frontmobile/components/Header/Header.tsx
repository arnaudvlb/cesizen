import { useAuth } from "@/hooks/useAuth";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./Header.styles";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const colors = useThemeColors();
  const { isAuth } = useAuth();

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
            {!isAuth && (
              <Link href="/login" style={[styles.link, { color: colors.text }]}>
                Connexion
              </Link>
            )}
            {isAuth && (
              <Link
                href="/logout"
                style={[styles.link, { color: colors.text }]}
              >
                Déconnexion
              </Link>
            )}
            <Link
              href="/emotions"
              style={[styles.link, { color: colors.text }]}
            >
              Émotions
            </Link>
            {isAuth && (
              <>
                <Link
                  href="/rapports"
                  style={[styles.link, { color: colors.text }]}
                >
                  Rapports
                </Link>

                <Link
                  href="/trackers"
                  style={[styles.link, { color: colors.text }]}
                >
                  Trackers
                </Link>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
