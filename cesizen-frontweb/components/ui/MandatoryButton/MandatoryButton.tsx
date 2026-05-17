import { MandatoryButtonProps } from "@/types/components/MandatoryButtonProps";
import styles from "@/components/ui/MandatoryButton/MandatoryButton.module.css";

export default function MandatoryButton({
  disabled,
  onClick,
  buttonText,
}: MandatoryButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
