type UploadButtonProps = {
  fileTypeAccepted: string;
  buttonText: string;
  onUpload: (file: File) => Promise<string | null>;
  loading: boolean;
  error: string | null;
};