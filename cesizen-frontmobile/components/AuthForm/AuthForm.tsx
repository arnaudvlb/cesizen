import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import Button from "@/components/ui/Button/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { styles } from "./AuthForm.styles";

type Props = {
  titreForm: string;
  champs: string[];
  names: string[];
  placeholders?: string[];
  buttonText: string;
  onSubmit?: (data: Record<string, string>) => void;
  footerContent?: React.ReactNode;
};

export default function AuthForm({
  titreForm,
  champs,
  names,
  placeholders,
  buttonText,
  onSubmit,
  footerContent,
}: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const colors = useThemeColors();

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  return (
    <View style={globalStyles.pageCenter}>
      <View style={[styles.authCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.authTitle, { color: colors.text }]}>
          {titreForm}
        </Text>

        <View style={styles.authForm}>
          {champs.map((champ, index) => {
            const key = names[index];

            return (
              <View key={index} style={styles.formGroup}>
                <Text style={[globalStyles.label, { color: colors.text }]}>
                  {champ}
                </Text>

                <TextInput
                  style={[
                    globalStyles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={placeholders?.[index] || ""}
                  placeholderTextColor={colors.text + "80"}
                  value={formData[key] || ""}
                  secureTextEntry={key === "password"}
                  onChangeText={(value) => handleChange(key, value)}
                />
              </View>
            );
          })}

          <Button text={buttonText} onPress={handleSubmit} />

          {footerContent && (
            <View style={styles.authFooter}>{footerContent}</View>
          )}
        </View>
      </View>
    </View>
  );
}
