import { styles } from "@/components/RapportsCard/RapportCard.styles";
import { useDeleteRapport } from "@/hooks/rapports/useDeleteRapport";
import { useThemeColors } from "@/hooks/useThemeColors";
import { RapportsCardProps } from "@/types/components/RapportsCardProps";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import EditButton from "../ui/EditButton/EditButton";

export default function RapportCard({ rapports, onDelete }: RapportsCardProps) {
  const { deleteRapport } = useDeleteRapport(0);
  const colors = useThemeColors();

  return (
    <View style={styles.rapportsGrid}>
      {rapports.map((rapport) => (
        <View
          key={rapport.id}
          style={[
            styles.rapportCard,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
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

          <View style={styles.rapportActions}>
            <EditButton url={`/rapport/${rapport.id}`} />
            <DeleteButton
              onConfirm={async () => {
                await deleteRapport(rapport.id);
              }}
              onDelete={onDelete}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
