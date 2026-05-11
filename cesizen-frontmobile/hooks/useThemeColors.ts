import { darkColors, lightColors } from "@/styles/colors";
import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const scheme = useColorScheme();

  return scheme === "dark" ? darkColors : lightColors;
};
