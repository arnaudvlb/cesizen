import EmotionsSelect from "@/components/EmotionsSelect/EmotionsSelect";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import MandatoryButton from "@/components/ui/MandatoryButton/MandatoryButton";
import TextArea from "@/components/ui/TextArea/TextArea";
import { useEmotions } from "@/hooks/emotions/useEmotions";
import { useCreateRapport } from "@/hooks/rapports/useCreateRapport";
import { useRapportForm } from "@/hooks/useRapportForm";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { useRouter } from "expo-router";
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

export default function NewRapportPage() {
  const { emotions } = useEmotions();
  const { createRapport, loading, error } = useCreateRapport();
  const router = useRouter();
  const colors = useThemeColors();

  const {
    reponses,
    commentaire,
    setCommentaire,
    setReponse,
    fullForm,
    serializedReponses,
    emotionGeneraleId,
  } = useRapportForm(emotions, Questions.length);

  const handleSubmit = async () => {
    const res = await createRapport({
      reponses: serializedReponses,
      commentaire: commentaire || null,
      dateRapport: new Date().toISOString(),
      emotionGenerale: `/api/emotion_generales/${emotionGeneraleId}`,
    });

    if (res) {
      setTimeout(() => {
        router.push("/rapports");
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
        Nouveau rapport
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
        buttonText="Créer le rapport"
      />
    </ScrollView>
  );
}
