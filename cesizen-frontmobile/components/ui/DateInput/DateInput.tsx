import { useThemeColors } from "@/hooks/useThemeColors";
import { DateInputProps } from "@/types/components/ui/DateInputProps";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./DateInput.styles";

export default function DateInput({
  value,
  onChange,
  placeholder,
}: DateInputProps) {
  const [visible, setVisible] = useState(false);
  const colors = useThemeColors();

  const date = value ? new Date(value) : new Date();

  const handleConfirm = (selectedDate: Date) => {
    setVisible(false);
    onChange(selectedDate.toISOString());
  };

  const displayText = value
    ? new Date(value).toLocaleDateString("fr-FR")
    : placeholder || "JJ/MM/AAAA";

  return (
    <View>
      <Pressable
        onPress={() => setVisible(true)}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={{
            color: value ? colors.text : colors.text + "80",
          }}
        >
          {displayText}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
}
