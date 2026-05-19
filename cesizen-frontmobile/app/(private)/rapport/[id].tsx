import EmotionsSelect from "@/components/EmotionsSelect/EmotionsSelect";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import MandatoryButton from "@/components/ui/MandatoryButton/MandatoryButton";
import TextArea from "@/components/ui/TextArea/TextArea";
import { useEmotions } from "@/hooks/emotions/useEmotions";
import { usePatchRapport } from "@/hooks/rapports/usePatchRapport";
import { useRapport } from "@/hooks/rapports/useRapport";
import { useRapportForm } from "@/hooks/useRapportForm";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const Questions = [
  "Quelle émotion décrit le mieux votre réveil aujourd’hui ?",
  "Quelle émotion ressentez-vous face à vos tâches importantes actuelles ?",
  "Quelle émotion domine dans vos interactions sociales récentes ?",
  "Quelle émotion correspond le mieux à la qualité de votre sommeil ?",
  "Quelle émotion reflète votre niveau d’énergie actuel ?",
  "Quelle émotion décrit votre humeur générale aujourd’hui ?",
  "Quelle émotion ressentez-vous face aux imprévus récents ?",
  "Quelle émotion correspond à votre perception de votre environnement ?",
  "Quelle émotion décrit votre rapport à vous-même aujourd’hui ?",
  "Quelle émotion reflète votre motivation globale actuelle ?",
];

export default function editRapportPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { emotions } = useEmotions();
  const { rapport } = useRapport(id);
  const router = useRouter();
  const colors = useThemeColors();

  const { patchRapport, loading, error } = usePatchRapport(id);

  const {
    reponses,
    commentaire,
    setCommentaire,
    setReponse,
    fullForm,
    serializedReponses,
    emotionGeneraleId,
  } = useRapportForm(
    emotions,
    Questions.length,
    rapport?.reponses,
    rapport?.commentaire,
  );

  const handleSubmit = async () => {
    const res = await patchRapport({
      reponses: serializedReponses,
      commentaire: commentaire || null,
      dateRapport: rapport?.dateRapport || new Date().toISOString(),
      emotionGenerale: `/api/emotion_generales/${emotionGeneraleId}`,
    });

    if (res) {
      setTimeout(() => {
        router.push(`/emotion/${emotionGeneraleId}`);
      }, 500);
    }
  };

  if (loading) {
    return (
      <View>
        <Text style={{ color: colors.text }}>Chargement...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={[globalStyles.page, { flex: 1 }]}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >
      {error && <FormMessage message={error} />}

      <Text style={[globalStyles.pageTitle, { color: colors.text }]}>
        Modification du rapport du{" "}
        {new Date(rapport?.dateRapport || new Date()).toLocaleDateString(
          "fr-FR",
        )}
      </Text>

      {Questions.map((question, index) => (
        <EmotionsSelect
          key={index}
          question={question}
          value={reponses[index] ?? ""}
          emotions={emotions}
          onChange={(value) => setReponse(index, value)}
        />
      ))}

      <TextArea
        value={commentaire}
        onChange={setCommentaire}
        placeHolder="Commentaire"
      />

      <MandatoryButton
        disabled={!fullForm}
        onClick={handleSubmit}
        buttonText="Mettre à jour le rapport"
      />
    </ScrollView>
  );
}
