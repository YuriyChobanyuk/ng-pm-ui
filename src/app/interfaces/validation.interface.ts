export interface FieldStatus {
  isInvalid: boolean;
  errors: string;
  setTouched: () => void;
}
