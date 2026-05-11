import { Text, View } from "react-native";
import { styles } from "./FormMessage.styles";

type FormMessageProps = {
  message: string;
  error?: boolean;
};

export default function FormMessage({
  message,
  error = false,
}: FormMessageProps) {
  return (
    <View style={[styles.message, error ? styles.error : styles.success]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
