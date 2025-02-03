export type Field = {
  id: string;
  name: string;
  type: 'boolean' | 'minutes' | 'slider' | 'text';
  defaultValue: number | boolean | string;
  value: number | boolean | string;
  step?: number;  // Optional step property for minutes fields
  max?: number;   // Optional max value for numeric fields
  unitLabel?: string; // Optional unit label for numeric fields
};

export interface Section {
  id: string;
  name: string;
  fields: Field[];
}

export interface DailyData {
  date: string;
  sections: Section[];
} 