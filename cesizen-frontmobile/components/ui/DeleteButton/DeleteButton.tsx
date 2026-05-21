"use client";

import { styles } from "@/components/ui/DeleteButton/DeleteButton.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { DeleteButtonProps } from "@/types/components/ui/DeleteButtonProps";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";

export default function DeleteButton({
  onConfirm,
  onDelete,
}: DeleteButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const colors = useThemeColors();
  const router = useRouter();

  const handleClick = async () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    await onConfirm();

    router.push(onDelete);
  };

  useEffect(() => {
    if (!confirm) return;

    const timeout = setTimeout(() => {
      setConfirm(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [confirm]);

  return (
    <Pressable
      onPress={handleClick}
      style={[styles.deleteButton, { borderColor: colors.primary }]}
    >
      <Text style={[styles.text, { color: colors.primary }]}>
        {confirm ? "Confirmer ?" : "X"}
      </Text>
    </Pressable>
  );
}
