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
        required: true,
        defaultValue: 0,
        value: 0,
        step: 1
      },
      {
        id: 'abs',
        name: 'Abs',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'chest',
        name: 'Chest',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'back',
        name: 'Back',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'shoulders',
        name: 'Shoulders',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'biceps',
        name: 'Biceps',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'triceps',
        name: 'Triceps',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'legs',
        name: 'Legs',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'stretching',
        name: 'Stretching',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'aerobic',
        name: 'Aerobic',
        type: 'boolean',
        required: true,
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
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'meditation',
        name: 'Meditation',
        type: 'boolean',
        required: true,
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
        id: 'sleep_seven',
        name: 'Slept 7+ hours',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'acidity',
        name: 'Acidity',
        type: 'boolean',
        required: true,
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
        required: true,
        defaultValue: 1,
        value: 1
      },
      {
        id: 'reading_time',
        name: 'Reading Time',
        type: 'minutes',
        required: true,
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
        required: true,
        defaultValue: 0,
        value: 0
      },
      {
        id: 'polyphenols',
        name: 'Polyphenols',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'heavy_food',
        name: 'Heavy Food',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'fast_food',
        name: 'Fast Food',
        type: 'boolean',
        required: true,
        defaultValue: false,
        value: false
      },
      {
        id: 'yogurt',
        name: 'Yogurt',
        type: 'boolean',
        required: true,
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
        required: true,
        defaultValue: 1,
        value: 1
      },
      {
        id: 'gaming',
        name: 'Gaming',
        type: 'boolean',
        required: true,
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
        required: false,
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

  // Cargar datos desde Google Sheets
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Cargar datos de hoy
        const todayDate = getLocalDate();
        const todayResponse = await fetch(`/api/load-data?date=${todayDate}`);
        let todayData = null;
        
        if (todayResponse.status !== 404) {
          if (!todayResponse.ok) {
            const errorData = await todayResponse.json();
            console.error('Error loading today data:', {
              status: todayResponse.status,
              statusText: todayResponse.statusText,
              error: errorData
            });
            throw new Error(`Failed to load today's data: ${errorData.details || errorData.error}`);
          }
          todayData = await todayResponse.json();
        }
        
        // Cargar datos de ayer
        const yesterdayDate = getYesterdayLocalDate();
        const yesterdayResponse = await fetch(`/api/load-data?date=${yesterdayDate}`);
        let yesterdayData = null;

        if (yesterdayResponse.status !== 404) {
          if (!yesterdayResponse.ok) {
            const errorData = await yesterdayResponse.json();
            console.error('Error loading yesterday data:', {
              status: yesterdayResponse.status,
              statusText: yesterdayResponse.statusText,
              error: errorData
            });
            throw new Error(`Failed to load yesterday's data: ${errorData.details || errorData.error}`);
          }
          yesterdayData = await yesterdayResponse.json();
        }

        // Actualizar las secciones con los datos o valores por defecto
        const updatedTodaySections = initialSections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
            const value = todayData ? todayData[fieldKey] : field.defaultValue;
            return {
              ...field,
              value: value === undefined || value === '' ? field.defaultValue : value
            };
          })
        }));
        setTodaySections(updatedTodaySections);

        const updatedYesterdaySections = initialSections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            const fieldKey = section.id === 'notes' ? 'notes' : `${section.id}_${field.id}`;
            const value = yesterdayData ? yesterdayData[fieldKey] : field.defaultValue;
            return {
              ...field,
              value: value === undefined || value === '' ? field.defaultValue : value
            };
          })
        }));
        setYesterdaySections(updatedYesterdaySections);

      } catch (error) {
        console.error('Error loading initial data:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
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
      // Exclude running field from columns
      const columnsFields = fields.filter(field => field.id !== 'running');
      const runningField = fields.find(field => field.id === 'running');
      const midPoint = Math.ceil(columnsFields.length / 2);
      const leftColumn = columnsFields.slice(0, midPoint);
      const rightColumn = columnsFields.slice(midPoint);

      return (
        <div key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.name}</h2>
          <div className="grid grid-cols-2 gap-x-8 mb-4">
            <div className="space-y-4">
              {leftColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                  sectionId={section.id}
                  date={isYesterday ? 
                    getYesterdayLocalDate() : 
                    getLocalDate()
                  }
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
                  date={isYesterday ? 
                    getYesterdayLocalDate() : 
                    getLocalDate()
                  }
                />
              ))}
            </div>
          </div>
          {runningField && (
            <div className="mt-4">
              <FieldComponent
                key={runningField.id}
                field={runningField}
                onChange={(value) => handleFieldChange(section.id, runningField.id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? 
                  getYesterdayLocalDate() : 
                  getLocalDate()
                }
              />
            </div>
          )}
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
                  name: ''  // Quitamos el nombre ya que está en el título
                }}
                onChange={(value) => handleFieldChange(section.id, section.fields[0].id, value, isYesterday)}
                sectionId={section.id}
                date={isYesterday ? 
                  getYesterdayLocalDate() : 
                  getLocalDate()
                }
              />
            </div>
            <div className="flex justify-center">
              <UpdateNotesButton 
                notes={section.fields[0].value as string}
                initialNotes={isYesterday ? yesterdaySections.find(s => s.id === 'notes')?.fields[0].value as string : todaySections.find(s => s.id === 'notes')?.fields[0].value as string}
                date={isYesterday ? 
                  getYesterdayLocalDate() : 
                  getLocalDate()
                }
                onUpdate={async () => {
                  const currentDate = isYesterday ? 
                    getYesterdayLocalDate() : 
                    getLocalDate();

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

    return (
      <div key={section.id} className="mb-8">
        <h2 className="text-xl font-bold mb-4">{section.name}</h2>
        <div className="space-y-4">
          {Array.isArray(section.fields) && section.fields.map(field => (
            <FieldComponent
              key={field.id}
              field={field}
              onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
              sectionId={section.id}
              date={isYesterday ? 
                getYesterdayLocalDate() : 
                getLocalDate()
              }
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
          <Stats data={historicalData} />
        )}
      </main>
    </div>
  );
} 