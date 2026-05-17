import { Emotion } from "@/types/database/emotions";

export type EmotionsSelectProps = {
  question: string;
  value: number | "";
  emotions: Emotion[];
  onChange: (emotionId: number) => void;
};