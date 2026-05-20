export type FormProps = {
  titreForm: string;
  champs: string[];
  names: string[];
  buttonText: string;
  placeHolders?: string[];
  textAreas?: string[];
  defaultValues?: Record<string, string>;
  onSubmit?: (data: Record<string, string>) => void;
  footerContent?: React.ReactNode;
}