import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend,
  ResponsiveContainer,
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
  // Workout
  { key: 'workout_running', name: 'Running (minutes)', type: 'number', aggregation: 'sum' },
  { key: 'workout_swimming', name: 'Swimming', type: 'boolean', aggregation: 'average' },
  { key: 'workout_any', name: 'Workout', type: 'boolean', aggregation: 'average' },
  
  // Health
  { key: 'health_sleep_seven', name: 'Sleep 7+ hours', type: 'boolean', aggregation: 'average' },
  { key: 'health_acidity', name: 'Acidity', type: 'boolean', aggregation: 'average' },
  { key: 'health_systolic', name: 'Max Systolic Pressure (mmHg)', type: 'number', aggregation: 'average', min_value: 120, max_value: 160 },
  { key: 'health_diastolic', name: 'Max Diastolic Pressure (mmHg)', type: 'number', aggregation: 'average', min_value: 80, max_value: 100 },
  { key: 'health_headache', name: 'Headache', type: 'boolean', aggregation: 'average' },
  
  // Habits
  { key: 'habits_nail_biting', name: 'Nail Biting', type: 'boolean', aggregation: 'average' },
  { key: 'habits_posture', name: 'Good Posture', type: 'boolean', aggregation: 'average' },
  
  // Productivity
  { key: 'productivity_level', name: 'Productivity Level', type: 'number', aggregation: 'average', min_value: 1, max_value: 5 },
  { key: 'productivity_reading_time', name: 'Reading Time (minutes)', type: 'number', aggregation: 'sum' },
  
  // Nutrition
  { key: 'nutrition_fruits', name: 'Fruits', type: 'number', aggregation: 'sum' },
  { key: 'nutrition_yogurt', name: 'Yogurt', type: 'boolean', aggregation: 'average' },
  { key: 'nutrition_polyphenols', name: 'Polyphenols', type: 'boolean', aggregation: 'average' },
  
  // Relax
  { key: 'life_gaming', name: 'Gaming', type: 'boolean', aggregation: 'average' },
  { key: 'relax_tea', name: 'Relaxing Tea', type: 'boolean', aggregation: 'average' }
];

interface AccumulatorEntry {
  date: string;
  _count: number;
  workout_any?: boolean;
  [key: string]: any;
}

export const Stats: React.FC<StatsProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  // Filtrar las métricas para excluir systolic y diastolic ya que tienen su propio gráfico
  const filteredMetrics = METRICS.filter(
    metric => metric.key !== 'health_systolic' && metric.key !== 'health_diastolic'
  );

  // Función para procesar los datos según el rango de tiempo seleccionado
  const processData = (rawData: StatsProps['data'], range: TimeRange) => {
    if (!rawData?.length) return [];

    const processEntry = (entry: any) => {
      const processed: { [key: string]: any } = { ...entry };
      
      // Procesar workout_any combinando todos los ejercicios
      const workoutFields = ['workout_abs', 'workout_legs', 'workout_chest', 'workout_biceps', 'workout_triceps', 'workout_back', 'workout_shoulders'];
      processed['workout_any'] = workoutFields.some(field => entry[field]) ? 1 : 0;
      
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
        const weeklyData = rawData.reduce((acc: AccumulatorEntry[], entry) => {
          const date = new Date(entry.date);
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          const weekKey = weekStart.toISOString().split('T')[0];

          const existingWeek = acc.find(w => w.date === weekKey);
          if (existingWeek) {
            // Procesar workout_any para la semana
            const workoutFields = ['workout_abs', 'workout_legs', 'workout_chest', 'workout_biceps', 'workout_triceps', 'workout_back', 'workout_shoulders'];
            const didWorkout = workoutFields.some(field => entry[field]);
            existingWeek.workout_any = existingWeek.workout_any || didWorkout;

            Object.keys(entry).forEach(key => {
              if (key !== 'date' && !workoutFields.includes(key)) {
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
            const newEntry: AccumulatorEntry = { ...entry, date: weekKey, _count: 1 };
            // Procesar workout_any para la nueva entrada
            const workoutFields = ['workout_abs', 'workout_legs', 'workout_chest', 'workout_biceps', 'workout_triceps', 'workout_back', 'workout_shoulders'];
            newEntry.workout_any = workoutFields.some(field => entry[field]);
            acc.push(newEntry);
          }
          return acc;
        }, []);

        return weeklyData.map(({ _count, ...rest }) => processEntry(rest));
      }
      case 'monthly': {
        const monthlyData = rawData.reduce((acc: AccumulatorEntry[], entry) => {
          const monthKey = entry.date.substring(0, 7);

          const existingMonth = acc.find(m => m.date === monthKey);
          if (existingMonth) {
            // Procesar workout_any para el mes
            const workoutFields = ['workout_abs', 'workout_legs', 'workout_chest', 'workout_biceps', 'workout_triceps', 'workout_back', 'workout_shoulders'];
            const didWorkout = workoutFields.some(field => entry[field]);
            existingMonth.workout_any = existingMonth.workout_any || didWorkout;

            Object.keys(entry).forEach(key => {
              if (key !== 'date' && !workoutFields.includes(key)) {
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
            const newEntry: AccumulatorEntry = { ...entry, date: monthKey, _count: 1 };
            // Procesar workout_any para la nueva entrada
            const workoutFields = ['workout_abs', 'workout_legs', 'workout_chest', 'workout_biceps', 'workout_triceps', 'workout_back', 'workout_shoulders'];
            newEntry.workout_any = workoutFields.some(field => entry[field]);
            acc.push(newEntry);
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
    const isNegativeMetric = metric.key === 'habits_nail_biting' || metric.key === 'health_acidity';

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
                stroke={isNegativeMetric ? "#ff0000" : "#8884d8"}
                dot={true}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderBloodPressureChart = (data: any[], timeRange: TimeRange) => {
    // Función para procesar los datos de presión arterial
    const processBloodPressureData = (rawData: any[]) => {
      if (!rawData?.length) return [];

      switch (timeRange) {
        case 'weekly': {
          const weeklyData = rawData.reduce((acc: any[], entry) => {
            const date = new Date(entry.date);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekKey = weekStart.toISOString().split('T')[0];

            const existingWeek = acc.find(w => w.date === weekKey);
            if (existingWeek) {
              // Para weekly, tomamos el máximo valor de la semana
              if (entry.health_systolic > 0) {
                existingWeek.health_systolic = Math.max(existingWeek.health_systolic || 0, entry.health_systolic);
              }
              if (entry.health_diastolic > 0) {
                existingWeek.health_diastolic = Math.max(existingWeek.health_diastolic || 0, entry.health_diastolic);
              }
            } else {
              acc.push({
                date: weekKey,
                health_systolic: entry.health_systolic > 0 ? entry.health_systolic : null,
                health_diastolic: entry.health_diastolic > 0 ? entry.health_diastolic : null
              });
            }
            return acc;
          }, []);

          return weeklyData;
        }
        case 'monthly': {
          const monthlyData = rawData.reduce((acc: any[], entry) => {
            const monthKey = entry.date.substring(0, 7);

            const existingMonth = acc.find(m => m.date === monthKey);
            if (existingMonth) {
              // Para monthly, tomamos el máximo valor del mes
              if (entry.health_systolic > 0) {
                existingMonth.health_systolic = Math.max(existingMonth.health_systolic || 0, entry.health_systolic);
              }
              if (entry.health_diastolic > 0) {
                existingMonth.health_diastolic = Math.max(existingMonth.health_diastolic || 0, entry.health_diastolic);
              }
            } else {
              acc.push({
                date: monthKey,
                health_systolic: entry.health_systolic > 0 ? entry.health_systolic : null,
                health_diastolic: entry.health_diastolic > 0 ? entry.health_diastolic : null
              });
            }
            return acc;
          }, []);

          return monthlyData;
        }
        default: {
          // Para daily, filtramos los valores 0 (default)
          return rawData.map(entry => ({
            date: entry.date,
            health_systolic: entry.health_systolic > 0 ? entry.health_systolic : null,
            health_diastolic: entry.health_diastolic > 0 ? entry.health_diastolic : null
          }));
        }
      }
    };

    const processedData = processBloodPressureData(data);

    return (
      <div className="bg-[var(--background-secondary)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Blood Pressure (mmHg)</h3>
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
                domain={[60, 160]}
                ticks={[60, 80, 100, 120, 140, 160]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="health_systolic"
                name="Systolic"
                stroke="#ff0000"
                dot={true}
                strokeWidth={2}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="health_diastolic"
                name="Diastolic"
                stroke="#0000ff"
                dot={true}
                strokeWidth={2}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-[800px] mx-auto">
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

      {/* Renderizar las gráficas en orden específico */}
      {filteredMetrics.map((metric) => {
        // Renderizar el gráfico de presión arterial después de headache
        if (metric.key === 'health_headache') {
          return (
            <React.Fragment key={metric.key}>
              {renderMetricChart(metric)}
              {renderBloodPressureChart(data, timeRange)}
            </React.Fragment>
          );
        }
        return (
          <div key={metric.key}>
            {renderMetricChart(metric)}
          </div>
        );
      })}
    </div>
  );
}; 