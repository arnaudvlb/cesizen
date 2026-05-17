import { styles } from "@/components/ui/TextArea/TextArea.styles";
import { useThemeColors } from "@/hooks/useThemeColors";
import { TextAreaProps } from "@/types/components/TextAreaProps";
import { TextInput } from "react-native";

export default function CommentaireField({
  value,
  onChange,
  placeHolder,
}: TextAreaProps) {
  const colors = useThemeColors();

  return (
    <TextInput
      style={[
        styles.textarea,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
          color: colors.text,
        },
      ]}
      value={value}
      onChangeText={onChange}
      placeholder={placeHolder}
      placeholderTextColor={colors.text + "80"}
      multiline
    />
  );
}
