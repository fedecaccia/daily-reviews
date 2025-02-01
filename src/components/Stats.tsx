import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';

type TimeRange = 'daily' | 'weekly' | 'monthly';

type MetricType = 'number' | 'boolean';
type AggregationType = 'sum' | 'average';

interface Metric {
  key: string;
  name: string;
  type: MetricType;
  aggregation: AggregationType;
  min_value?: number;
  max_value?: number;
}

interface StatsProps {
  data: Array<{
    date: string;
    [key: string]: any;
  }>;
}

// Configuración simplificada de métricas
const METRICS: Metric[] = [
  { key: 'workout_running', name: 'Running (minutes)', type: 'number', aggregation: 'sum' },
  { key: 'workout_abs', name: 'Abs', type: 'boolean', aggregation: 'average' },
  { key: 'workout_legs', name: 'Legs', type: 'boolean', aggregation: 'average' },
  { key: 'workout_aerobic', name: 'Aerobic', type: 'boolean', aggregation: 'average' },
  { key: 'health_sleep_seven', name: 'Sleep 7+ hours', type: 'boolean', aggregation: 'average' },
  { key: 'health_acidity', name: 'Acidity', type: 'boolean', aggregation: 'average' },
  { key: 'productivity_level', name: 'Productivity Level', type: 'number', aggregation: 'average', min_value: 1, max_value: 5 },
  { key: 'productivity_reading_time', name: 'Reading Time (minutes)', type: 'number', aggregation: 'sum' },
  { key: 'nutrition_fruits', name: 'Fruits', type: 'number', aggregation: 'sum' },
  { key: 'nutrition_yogurt', name: 'Yogurt', type: 'boolean', aggregation: 'average' },
  { key: 'nutrition_polyphenols', name: 'Polyphenols', type: 'boolean', aggregation: 'average' },
  { key: 'life_gaming', name: 'Gaming', type: 'boolean', aggregation: 'average' }
];

export const Stats: React.FC<StatsProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  // Función para procesar los datos según el rango de tiempo seleccionado
  const processData = (rawData: StatsProps['data'], range: TimeRange) => {
    if (!rawData?.length) return [];

    const processEntry = (entry: any) => {
      const processed = { ...entry };
      Object.keys(processed).forEach(key => {
        if (key !== 'date') {
          const metric = METRICS.find(m => m.key === key);
          if (!metric) return;
          
          if (metric.type === 'boolean') {
            processed[key] = processed[key] * 100; // Convertir booleano a porcentaje
          } else if (metric.type === 'number' && metric.aggregation === 'average') {
            if (metric.min_value !== undefined && metric.max_value !== undefined) {
              // Para sliders (ej: 1-5), mapeamos el rango completo a 0-100%
              const range = metric.max_value - metric.min_value;
              processed[key] = ((processed[key] - metric.min_value) / range) * 100;
            } else if (metric.max_value) {
              processed[key] = (processed[key] / metric.max_value) * 100;
            } else {
              processed[key] = processed[key] * 100;
            }
          }
        }
      });
      return processed;
    };

    switch (range) {
      case 'weekly': {
        const weeklyData = rawData.reduce((acc: any[], entry) => {
          const date = new Date(entry.date);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekKey = weekStart.toISOString().split('T')[0];

          const existingWeek = acc.find(w => w.date === weekKey);
          if (existingWeek) {
            Object.keys(entry).forEach(key => {
              if (key !== 'date') {
                const metric = METRICS.find(m => m.key === key);
                if (!metric) return;

                if (metric.type === 'number') {
                  if (metric.aggregation === 'sum') {
                    existingWeek[key] = (existingWeek[key] || 0) + (entry[key] || 0);
                  } else { // average
                    existingWeek[key] = ((existingWeek[key] * existingWeek._count) + (entry[key] || 0)) / (existingWeek._count + 1);
                  }
                } else if (metric.type === 'boolean') {
                  existingWeek[key] = ((existingWeek[key] * existingWeek._count) + (entry[key] ? 1 : 0)) / (existingWeek._count + 1);
                }
              }
            });
            existingWeek._count++;
          } else {
            acc.push({ ...entry, date: weekKey, _count: 1 });
          }
          return acc;
        }, []);

        return weeklyData.map(({ _count, ...rest }) => processEntry(rest));
      }
      case 'monthly': {
        const monthlyData = rawData.reduce((acc: any[], entry) => {
          const monthKey = entry.date.substring(0, 7);

          const existingMonth = acc.find(m => m.date === monthKey);
          if (existingMonth) {
            Object.keys(entry).forEach(key => {
              if (key !== 'date') {
                const metric = METRICS.find(m => m.key === key);
                if (!metric) return;

                if (metric.type === 'number') {
                  if (metric.aggregation === 'sum') {
                    existingMonth[key] = (existingMonth[key] || 0) + (entry[key] || 0);
                  } else { // average
                    existingMonth[key] = ((existingMonth[key] * existingMonth._count) + (entry[key] || 0)) / (existingMonth._count + 1);
                  }
                } else if (metric.type === 'boolean') {
                  existingMonth[key] = ((existingMonth[key] * existingMonth._count) + (entry[key] ? 1 : 0)) / (existingMonth._count + 1);
                }
              }
            });
            existingMonth._count++;
          } else {
            acc.push({ ...entry, date: monthKey, _count: 1 });
          }
          return acc;
        }, []);

        return monthlyData.map(({ _count, ...rest }) => processEntry(rest));
      }
      default:
        return rawData.map(entry => processEntry(entry));
    }
  };

  const processedData = processData(data, timeRange);

  const renderMetricChart = (metric: Metric) => {
    const isNumber = metric.type === 'number';
    const isPercentage = metric.type === 'boolean' || (metric.type === 'number' && metric.aggregation === 'average');

    return (
      <div className="bg-[var(--background-secondary)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{metric.name}</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45}
                textAnchor="end"
                height={60}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={isPercentage ? [0, 100] : ['auto', 'auto']}
                tickFormatter={isPercentage ? (value) => `${value}%` : undefined}
                ticks={isPercentage ? [0, 25, 50, 75, 100] : undefined}
              />
              <Line
                type="monotone"
                dataKey={metric.key}
                stroke="#8884d8"
                dot={true}
                strokeWidth={2}
              />
              <Brush dataKey="date" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-[800px] mx-auto">
      {/* Selector de rango de tiempo */}
      <div className="flex justify-center space-x-4 mb-8">
        {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded ${
              timeRange === range
                ? 'bg-[var(--color-blue)] text-[var(--text-primary)]'
                : 'bg-[var(--color-disabled)] text-[var(--text-secondary)] hover:bg-opacity-80'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Renderizar las gráficas individuales */}
      {METRICS.map((metric) => (
        <div key={metric.key}>
          {renderMetricChart(metric)}
        </div>
      ))}
    </div>
  );
}; 