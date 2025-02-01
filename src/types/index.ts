export type Field = {
  id: string;
  name: string;
  type: 'boolean' | 'minutes' | 'slider' | 'text';
  required: boolean;
  defaultValue: number | boolean | string;
  value: number | boolean | string;
  step?: number;  // Optional step property for minutes fields
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