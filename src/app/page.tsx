'use client';

import { useState, useEffect } from 'react';
import { Field as FieldComponent } from '@/components/Field';
import { Section } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UpdateNotesButton } from '@/components/UpdateNotesButton';
import { Stats } from '@/components/Stats';

const initialSections: Section[] = [
  {
    id: 'workout',
    name: 'Workout',
    fields: [
      {
        id: 'running',
        name: 'Running',
        type: 'minutes',
        defaultValue: 0,
        value: 0,
        step: 1
      },
      {
        id: 'swimming',
        name: 'Swimming',
        type: 'minutes',
        defaultValue: 0,
        value: 0,
        step: 25,
        max: 5000
      },
      {
        id: 'abs',
        name: 'Abs',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'chest',
        name: 'Chest',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'back',
        name: 'Back',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'shoulders',
        name: 'Shoulders',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'biceps',
        name: 'Biceps',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'triceps',
        name: 'Triceps',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'legs',
        name: 'Legs',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'stretching',
        name: 'Stretching',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'aerobic',
        name: 'Aerobic',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'relax',
    name: 'Relax',
    fields: [
      {
        id: 'yoga',
        name: 'Yoga',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'meditation',
        name: 'Meditation',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'tea',
        name: 'Relaxing Tea',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'health',
    name: 'Health',
    fields: [
      {
        id: 'systolic',
        name: 'Max Systolic Pressure',
        type: 'minutes',
        defaultValue: 120,
        value: 120,
        step: 5
      },
      {
        id: 'diastolic',
        name: 'Max Diastolic Pressure',
        type: 'minutes',
        defaultValue: 80,
        value: 80,
        step: 5
      },
      {
        id: 'sleep_seven',
        name: 'Slept 7+ hours',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'acidity',
        name: 'Acidity',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'headache',
        name: 'Headache',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'habits',
    name: 'Habits',
    fields: [
      {
        id: 'nail_biting',
        name: 'Nail Biting',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'posture',
        name: 'Good Posture',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity',
    fields: [
      {
        id: 'productivity_level',
        name: 'Productivity Level',
        type: 'slider',
        defaultValue: 1,
        value: 1
      },
      {
        id: 'reading_time',
        name: 'Reading Time',
        type: 'minutes',
        defaultValue: 0,
        value: 0,
        step: 10
      }
    ]
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    fields: [
      {
        id: 'fruits',
        name: 'Fruits',
        type: 'minutes',
        defaultValue: 0,
        value: 0
      },
      {
        id: 'polyphenols',
        name: 'Polyphenols',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'heavy_food',
        name: 'Heavy Food',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'fast_food',
        name: 'Fast Food',
        type: 'boolean',
        defaultValue: false,
        value: false
      },
      {
        id: 'yogurt',
        name: 'Yogurt',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'life',
    name: 'Life',
    fields: [
      {
        id: 'couple_discussions',
        name: 'Couple Discussions',
        type: 'slider',
        defaultValue: 1,
        value: 1
      },
      {
        id: 'gaming',
        name: 'Gaming',
        type: 'boolean',
        defaultValue: false,
        value: false
      }
    ]
  },
  {
    id: 'notes',
    name: 'Daily Takeaways',
    fields: [
      {
        id: 'notes',
        name: '',
        type: 'text',
        defaultValue: '',
        value: ''
      }
    ]
  }
];

function getLocalDate() {
  const now = new Date();
  return now.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD en la zona horaria local
}

function getYesterdayLocalDate() {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return now.toLocaleDateString('en-CA'); // Formato YYYY-MM-DD en la zona horaria local
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'today' | 'yesterday' | 'stats'>('today');
  const [todaySections, setTodaySections] = useState<Section[]>(initialSections);
  const [yesterdaySections, setYesterdaySections] = useState<Section[]>(initialSections);
  const [historicalData, setHistoricalData] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Cargar datos de hoy y ayer en paralelo
        const [todayData, yesterdayData] = await Promise.all([
          fetch(`/api/load-day?date=${getLocalDate()}`).then(r => r.json()),
          fetch(`/api/load-day?date=${getYesterdayLocalDate()}`).then(r => r.json())
        ]);

        // Actualizar datos de hoy
        if (todayData) {
          setTodaySections(prevSections =>
            prevSections.map(section => ({
              ...section,
              fields: section.fields.map(field => {
                const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                return {
                  ...field,
                  value: todayData[fieldKey] ?? field.defaultValue
                };
              })
            }))
          );
        }

        // Actualizar datos de ayer
        if (yesterdayData) {
          setYesterdaySections(prevSections =>
            prevSections.map(section => ({
              ...section,
              fields: section.fields.map(field => {
                const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                return {
                  ...field,
                  value: yesterdayData[fieldKey] ?? field.defaultValue
                };
              })
            }))
          );
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Cargar datos históricos cuando se selecciona la pestaña stats
  useEffect(() => {
    const loadHistoricalData = async () => {
      if (activeTab === 'stats') {
        try {
          const response = await fetch('/api/load-historical-data');
          if (!response.ok) {
            throw new Error('Failed to load historical data');
          }
          const data = await response.json();
          setHistoricalData(data);
        } catch (error) {
          console.error('Error loading historical data:', error);
        }
      }
    };

    loadHistoricalData();
  }, [activeTab]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: number | boolean | string, isYesterday: boolean = false) => {
    console.log('Field change:', {
      sectionId,
      fieldId,
      value,
      isYesterday,
      type: typeof value
    });

    const setSections = isYesterday ? setYesterdaySections : setTodaySections;
    const sections = isYesterday ? yesterdaySections : todaySections;

    // Asegurarse de que el valor sea del tipo correcto
    const section = sections.find(s => s.id === sectionId);
    const field = section?.fields.find(f => f.id === fieldId);
    
    if (field) {
      let processedValue = value;
      
      // Convertir valores según el tipo de campo
      switch (field.type) {
        case 'minutes':
          processedValue = Number(value);
          break;
        case 'slider':
          processedValue = Number(value);
          break;
        case 'boolean':
          processedValue = Boolean(value);
          break;
        case 'text':
          processedValue = String(value);
          break;
      }

      console.log('Processed value:', {
        original: value,
        processed: processedValue,
        fieldType: field.type
      });

      setSections(sections.map(section => 
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map(field =>
                field.id === fieldId ? { ...field, value: processedValue } : field
              )
            }
          : section
      ));
    } else {
      console.error('Field not found:', { sectionId, fieldId });
    }
  };

  const renderSection = (section: Section, isYesterday: boolean = false) => {
    if (section.id === 'workout') {
      const fields = section.fields;
      // Exclude running and swimming fields from columns
      const columnsFields = fields.filter(field => field.id !== 'running' && field.id !== 'swimming');
      const runningField = fields.find(field => field.id === 'running');
      const swimmingField = fields.find(field => field.id === 'swimming');
      const midPoint = Math.ceil(columnsFields.length / 2);
      const leftColumn = columnsFields.slice(0, midPoint);
      const rightColumn = columnsFields.slice(midPoint);

      return (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          {runningField && (
            <div className="mb-6">
              <FieldComponent
                key={runningField.id}
                field={runningField}
                onChange={(value) => handleFieldChange(section.id, runningField.id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
              />
            </div>
          )}
          {swimmingField && (
            <div className="mb-6">
              <FieldComponent
                key={swimmingField.id}
                field={{
                  ...swimmingField,
                  type: 'minutes',
                  unitLabel: 'm'
                }}
                onChange={(value) => handleFieldChange(section.id, swimmingField.id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-4">
              {leftColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (section.id === 'nutrition') {
      const fields = section.fields;
      // Exclude fruits from columns
      const columnsFields = fields.filter(field => field.id !== 'fruits');
      const fruitsField = fields.find(field => field.id === 'fruits');
      const midPoint = Math.ceil(columnsFields.length / 2);
      const leftColumn = columnsFields.slice(0, midPoint);
      const rightColumn = columnsFields.slice(midPoint);

      return (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          {fruitsField && (
            <div className="mb-6">
              <FieldComponent
                key={fruitsField.id}
                field={fruitsField}
                onChange={(value) => handleFieldChange(section.id, fruitsField.id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-4">
              {leftColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (section.id === 'health') {
      const fields = section.fields;
      // Exclude pressure fields from columns
      const columnsFields = fields.filter(field => !['systolic', 'diastolic'].includes(field.id));
      const pressureFields = fields.filter(field => ['systolic', 'diastolic'].includes(field.id));
      const midPoint = Math.ceil(columnsFields.length / 2);
      const leftColumn = columnsFields.slice(0, midPoint);
      const rightColumn = columnsFields.slice(midPoint);

      return (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          {pressureFields.map(field => (
            <div key={field.id} className="mb-6">
              <FieldComponent
                key={field.id}
                field={field}
                onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-4">
              {leftColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (section.id === 'notes') {
      return (
        <div key={section.id} className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Daily Takeaways</h2>
          <div className="w-full space-y-8">
            <div className="w-full">
              <FieldComponent
                key={section.fields[0].id}
                field={{
                  ...section.fields[0],
                  name: ''
                }}
                onChange={(value) => handleFieldChange(section.id, section.fields[0].id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
              />
            </div>
            <div className="flex justify-center">
              <UpdateNotesButton 
                notes={section.fields[0].value as string}
                initialNotes={isYesterday ? yesterdaySections.find(s => s.id === 'notes')?.fields[0].value as string : todaySections.find(s => s.id === 'notes')?.fields[0].value as string}
                date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                onUpdate={async () => {
                  const currentDate = isYesterday ? getYesterdayLocalDate() : getLocalDate();
                  const response = await fetch(`/api/load-data?date=${currentDate}`);
                  const data = await response.json();
                  if (data) {
                    const updatedSections = initialSections.map(section => ({
                      ...section,
                      fields: section.fields.map(field => {
                        const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
                        return {
                          ...field,
                          value: data[fieldKey] ?? field.defaultValue
                        };
                      })
                    }));
                    if (isYesterday) {
                      setYesterdaySections(updatedSections);
                    } else {
                      setTodaySections(updatedSections);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Sections that should be rendered in two columns
    const twoColumnsLayouts = ['habits', 'relax'];

    if (twoColumnsLayouts.includes(section.id)) {
      const midPoint = Math.ceil(section.fields.length / 2);
      const leftColumn = section.fields.slice(0, midPoint);
      const rightColumn = section.fields.slice(midPoint);

      return (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="space-y-4">
              {leftColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Default render for other sections (Relax, Productivity, Life)
    const midPoint = Math.ceil(section.fields.length / 2);
    const leftColumn = section.fields.slice(0, midPoint);
    const rightColumn = section.fields.slice(midPoint);

    return (
      <div key={section.id} className="mb-8">
        <h2 className="text-xl font-bold mb-4">{section.name}</h2>
        <div className="space-y-4">
          {section.fields.map(field => (
            <FieldComponent
              key={field.id}
              field={field}
              onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
              sectionId={section.id}
              date={isYesterday ? getYesterdayLocalDate() : getLocalDate()}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 bg-[var(--background)] z-10 shadow-sm">
        <div className="max-w-480 mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex space-x-2">
              {[
                { id: 'today', name: 'Today' },
                { id: 'yesterday', name: 'Yesterday' },
                { id: 'stats', name: 'Stats' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 py-2 px-4 rounded transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[var(--color-blue)] text-[var(--text-primary)]'
                      : 'bg-[var(--color-disabled)] text-[var(--text-secondary)] hover:bg-opacity-80'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="main-container py-6">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-lg">Loading...</div>
          </div>
        ) : (
          <>
            {activeTab === 'today' && (
              <>
                {Array.isArray(todaySections) && todaySections.map(section => renderSection(section))}
              </>
            )}
            {activeTab === 'yesterday' && (
              <>
                {Array.isArray(yesterdaySections) && yesterdaySections.map(section => renderSection(section, true))}
              </>
            )}
            {activeTab === 'stats' && (
              <>
                <Stats data={historicalData} />
                <div className="flex justify-center mt-8 mb-8">
                  <a
                    href={process.env.NEXT_PUBLIC_SHEET_LINK || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[var(--color-blue)] text-[var(--text-primary)] rounded-lg hover:bg-opacity-80 transition-opacity"
                    onClick={() => {
                      if (!process.env.NEXT_PUBLIC_SHEET_LINK) {
                        console.error('Sheet link not configured');
                      }
                    }}
                  >
                    Raw Data
                  </a>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}