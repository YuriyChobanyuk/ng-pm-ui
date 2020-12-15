export interface NavigationListItem {
  link: string;
  label: string;
}

export type ValidationStatus = Map<string, { invalid: boolean; error: string }>;
