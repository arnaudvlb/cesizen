import { styles } from "@/components/RapportsCard/RapportCard.module";
import { useThemeColors } from "@/hooks/useThemeColors";
import { RapportsCardProps } from "@/types/components/RapportsCardProps";
import { Link, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function RapportCard({ rapports }: RapportsCardProps) {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <View style={styles.rapportsGrid}>
      {rapports.map((rapport) => (
        <View key={rapport.id} style={styles.rapportCard}>
          <Link
            href={{
              pathname: "/emotion/[id]",
              params: { id: rapport.emotionGenerale.id },
            }}
          >
            <View style={styles.rapportImageContainer}>
              <Image
                style={styles.rapportImage}
                source={{
                  uri: `http://192.168.1.21:8000${rapport.emotionGenerale.imageUrl}`,
                }}
              />
            </View>

            <View style={styles.rapportContent}>
              <Text style={[styles.rapportTitle, { color: colors.text }]}>
                {rapport.emotionGenerale.libelle}
              </Text>

              <Text style={[styles.rapportDate, { color: colors.text }]}>
                {new Date(rapport.dateRapport).toLocaleDateString("fr-FR")}
              </Text>
            </View>
          </Link>

          <View style={styles.rapportActions} />
        </View>
      ))}
    </View>
  );
}
