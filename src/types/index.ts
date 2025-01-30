export interface Field {
  id: string;
  name: string;
  type: 'boolean' | 'minutes' | 'text' | 'slider';
  required: boolean;
  defaultValue: boolean | number | string;
  value: boolean | number | string;
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