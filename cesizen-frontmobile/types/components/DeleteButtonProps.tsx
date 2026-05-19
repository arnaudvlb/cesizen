import { Href } from "expo-router";

export type DeleteButtonProps = {
  onConfirm: () => Promise<void>;
  onDelete: Href;
};
