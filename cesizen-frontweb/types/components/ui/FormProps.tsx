export type FormProps = {
  titreForm: string;
  champs: string[];
  names: string[];
  buttonText: string;
  placeHolders?: string[];
  textAreas?: string[];
  onSubmit?: (data: Record<string, string>) => void;
  footerContent?: React.ReactNode;
}