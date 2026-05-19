"use client";

import { styles } from "@/components/ui/EditButton/EditButton.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { EditButtonProps } from "@/types/components/EditButtonProps";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function EditButton({ url }: EditButtonProps) {
  const colors = useThemeColors();
  return (
    <Link
      href={url}
      style={[
        styles.editButton,
        { borderColor: colors.primary, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.editText, { color: colors.primary }]}>Modifier</Text>
    </Link>
  );
}
