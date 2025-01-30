export type FieldType = 'minutes' | 'boolean' | 'text' | 'slider';

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  defaultValue: number | boolean | string;
  value: number | boolean | string;
}

export interface Section {
  id: string;
  name: string;
  fields: Field[];
}

export interface DailyData {
  date: string;
  sections: Section[];
} 