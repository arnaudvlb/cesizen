"use client";

import { useEmotions } from "@/hooks/emotions/useEmotions";
import { useRapportForm } from "@/hooks/useRapportForm";
import MandatoryButton from "@/components/ui/MandatoryButton/MandatoryButton";
import TextArea from "@/components/ui/TextArea/TextArea";
import EmotionsSelect from "@/components/EmotionsSelect/EmotionsSelect";
import { useParams, useRouter } from "next/navigation";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { usePatchRapport } from "@/hooks/rapports/usePatchRapport";
import { useRapport } from "@/hooks/rapports/useRapport";

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
  const params = useParams();
  const id = params.id as string;
  const { emotions } = useEmotions();
  const { rapport } = useRapport(id);
  const { patchRapport, loading ,error } = usePatchRapport(id);
  const router = useRouter();

  const {
    reponses,
    commentaire,
    setCommentaire,
    setReponse,
    fullForm,
    serializedReponses,
    emotionGeneraleId,
  } = useRapportForm(emotions, Questions.length, rapport?.reponses, rapport?.commentaire);
  console.log(rapport);
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
      });
    }
  };
  
  if (loading) return <p>Chargement...</p>;
  
  return (
    <>
      {(error) && (
        <FormMessage message={error} />
      )}
      <div className="page">
        <h1 className="pageTitle">Modification du rapport du {new Date(rapport?.dateRapport || new Date()).toLocaleDateString("fr-FR")}</h1>
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
      </div>
    </>
  );
}
