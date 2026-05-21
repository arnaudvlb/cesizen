import Button from "@/components/ui/Button/Button";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { FormProps } from "@/types/components/FormProps";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import DateInput from "../DateInput/DateInput";
import { styles } from "./Form.styles";

export default function Form({
  titreForm,
  champs,
  names,
  buttonText,
  placeHolders,
  textAreas,
  defaultValues,
  onSubmit,
  footerContent,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const colors = useThemeColors();

  useEffect(() => {
    if (defaultValues) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

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
      <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
        <Text style={[styles.formTitle, { color: colors.text }]}>
          {titreForm}
        </Text>

        <View style={styles.formForm}>
          {champs.map((champ, index) => {
            const key = names[index];

            const isDate = key.toLowerCase().includes("date");

            return (
              <View key={index} style={styles.formGroup}>
                <Text style={[globalStyles.label, { color: colors.text }]}>
                  {champ}
                </Text>

                {isDate ? (
                  <DateInput
                    value={formData[key] || ""}
                    placeholder={placeHolders?.[index] || ""}
                    onChange={(value) => handleChange(key, value)}
                  />
                ) : (
                  <TextInput
                    style={[
                      globalStyles.input,
                      {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border,
                      },
                    ]}
                    placeholder={placeHolders?.[index] || ""}
                    placeholderTextColor={colors.text + "80"}
                    value={formData[key] || ""}
                    secureTextEntry={key === "password"}
                    onChangeText={(value) => handleChange(key, value)}
                  />
                )}
              </View>
            );
          })}

          {textAreas?.map((textArea, index) => {
            const key = textArea;
            return (
              <View key={index} style={styles.formGroup}>
                <Text style={[globalStyles.label, { color: colors.text }]}>
                  {textArea}
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={[
                    globalStyles.input,
                    styles.formTextarea,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={textArea}
                  placeholderTextColor={colors.text + "80"}
                  value={formData[key] || ""}
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
