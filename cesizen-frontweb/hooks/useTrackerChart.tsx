import { Rapport } from "@/types/database/rapports";
import { Tracker } from "@/types/database/trackers";

export type TrackerEmotionStat = {
  libelle: string;
  couleur: string;
  count: number;
  percentage: number;
};

export type TrackerChartData = {
  name: string;
  value: number;
  color: string;
};

export type TrackerStats = {
  totalRapports: number;
  dominantEmotion: TrackerEmotionStat | null;
  chartData: TrackerChartData[];
  recap: TrackerEmotionStat[];
  summary: string;
};

export function useTrackerChart(
  tracker: Tracker | undefined,
  rapports: Rapport[],
): TrackerStats {
  if (!tracker) {
    return {
      totalRapports: 0,
      dominantEmotion: null,
      chartData: [],
      recap: [],
      summary: "",
    };
  }

  const start = new Date(tracker.dateDebut).getTime();
  const end = new Date(tracker.dateFin).getTime();

  const filteredRapports = rapports.filter((rapport) => {
    const rapportDate = new Date(rapport.dateRapport).getTime();

    return rapportDate >= start && rapportDate <= end;
  });

  const totalRapports = filteredRapports.length;

  if (totalRapports === 0) {
    return {
      totalRapports: 0,
      dominantEmotion: null,
      chartData: [],
      recap: [],
      summary: "Aucun rapport disponible sur cette période.",
    };
  }

  const emotionMap = new Map<
    string,
    {
      libelle: string;
      couleur: string;
      count: number;
    }
  >();

  filteredRapports.map((rapport) => {
    const emotion = rapport.emotionGenerale;

    if (!emotion) {
      return;
    }

    const key = emotion.libelle;

    if (!emotionMap.has(key)) {
      emotionMap.set(key, {
        libelle: emotion.libelle,
        couleur: emotion.couleur,
        count: 0,
      });
    }

    emotionMap.get(key)!.count += 1;
  });

  const recap: TrackerEmotionStat[] = Array.from(emotionMap.values())
    .map((emotion) => ({
      ...emotion,
      percentage: Math.round((emotion.count / totalRapports) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const dominantEmotion = recap[0] ?? null;

  const chartData: TrackerChartData[] = recap.map((emotion) => ({
    name: emotion.libelle,
    value: emotion.count,
    color: emotion.couleur,
  }));
  const summary = dominantEmotion
    ? `L’émotion dominante sur cette période est ${dominantEmotion.libelle} avec ${dominantEmotion.percentage}% des rapports analysés.`
    : "Aucun rapport disponible sur cette période.";

  return {
    totalRapports,
    dominantEmotion,
    chartData,
    recap,
    summary,
  };
}
