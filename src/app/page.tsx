'use client';

import { useState, useEffect } from 'react';
import { Field as FieldComponent } from '@/components/Field';
import { Field, DailyData, Section } from '@/types';
import { UpdateButton } from '@/components/UpdateButton';
import { ThemeToggle } from '@/components/ThemeToggle';

const initialSections: Section[] = [
  {
    id: 'workout',
    name: 'Workout',
    fields: [
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
        id: 'level',
        name: 'Productivity Level',
        type: 'slider',
        required: true,
        defaultValue: 1,
        value: 1
      },
      {
        id: 'reading',
        name: 'Reading Time',
        type: 'minutes',
        required: true,
        defaultValue: 0,
        value: 0
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
    name: 'Notes',
    fields: [
      {
        id: 'notes',
        name: 'Daily Notes',
        type: 'text',
        required: false,
        defaultValue: '',
        value: ''
      }
    ]
  }
];

// Constantes para las keys de localStorage
const STORAGE_KEYS = {
  TODAY: 'goals_tracker_today',
  YESTERDAY: 'goals_tracker_yesterday',
  LAST_SAVED_DATE: 'goals_tracker_last_date'
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'today' | 'yesterday' | 'stats'>('today');
  const [todaySections, setTodaySections] = useState<Section[]>(initialSections);
  const [yesterdaySections, setYesterdaySections] = useState<Section[]>(initialSections);
  const [lastSavedDate, setLastSavedDate] = useState<string>('');

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Cargar datos guardados al iniciar
  useEffect(() => {
    // Intentamos recuperar los datos del localStorage
    const savedLastDate = localStorage.getItem(STORAGE_KEYS.LAST_SAVED_DATE) || '';
    const currentDate = getCurrentDate();

    let savedTodaySections: Section[];
    let savedYesterdaySections: Section[];

    try {
      const todayData = localStorage.getItem(STORAGE_KEYS.TODAY);
      const yesterdayData = localStorage.getItem(STORAGE_KEYS.YESTERDAY);
      
      savedTodaySections = todayData ? JSON.parse(todayData) : initialSections;
      savedYesterdaySections = yesterdayData ? JSON.parse(yesterdayData) : initialSections;
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
      savedTodaySections = initialSections;
      savedYesterdaySections = initialSections;
    }

    // Si es un nuevo día
    if (savedLastDate && savedLastDate !== currentDate) {
      // Mover los datos de hoy a ayer
      localStorage.setItem(STORAGE_KEYS.YESTERDAY, JSON.stringify(savedTodaySections));
      // Resetear los datos de hoy
      localStorage.setItem(STORAGE_KEYS.TODAY, JSON.stringify(initialSections));
      
      setYesterdaySections(savedTodaySections);
      setTodaySections(initialSections);
    } else {
      // Si es el mismo día o primer uso, cargar los datos guardados o usar iniciales
      setTodaySections(savedTodaySections);
      setYesterdaySections(savedYesterdaySections);
    }

    // Actualizar la fecha
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED_DATE, currentDate);
    setLastSavedDate(currentDate);
  }, []);

  // Guardar cambios en localStorage cuando se modifican los campos
  useEffect(() => {
    if (lastSavedDate) {
      localStorage.setItem(STORAGE_KEYS.TODAY, JSON.stringify(todaySections));
    }
  }, [todaySections, lastSavedDate]);

  useEffect(() => {
    if (lastSavedDate) {
      localStorage.setItem(STORAGE_KEYS.YESTERDAY, JSON.stringify(yesterdaySections));
    }
  }, [yesterdaySections, lastSavedDate]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: number | boolean | string, isYesterday: boolean = false) => {
    const setSections = isYesterday ? setYesterdaySections : setTodaySections;
    const sections = isYesterday ? yesterdaySections : todaySections;

    setSections(sections.map(section => 
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.map(field =>
              field.id === fieldId ? { ...field, value } : field
            )
          }
        : section
    ));
  };

  const renderSection = (section: Section, isYesterday: boolean = false) => {
    if (section.id === 'workout') {
      const fields = section.fields;
      const midPoint = Math.ceil(fields.length / 2);
      const leftColumn = fields.slice(0, midPoint);
      const rightColumn = fields.slice(midPoint);

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
                />
              ))}
            </div>
            <div className="space-y-4">
              {rightColumn.map(field => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  onChange={(value) => handleFieldChange(section.id, field.id, value, isYesterday)}
                />
              ))}
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
            />
          ))}
        </div>
      </div>
    );
  };

  const handleUpdate = async (isYesterday: boolean = false) => {
    // Aquí irá la lógica para actualizar la spreadsheet
    await new Promise(resolve => setTimeout(resolve, 1000));

    const date = new Date();
    if (isYesterday) {
      date.setDate(date.getDate() - 1);
    }

    // TODO: Implementar la actualización real a la spreadsheet
    const dataToUpdate = {
      date: date.toISOString().split('T')[0],
      sections: isYesterday ? yesterdaySections : todaySections
    };

    console.log('Data to update:', dataToUpdate);
    // TODO: Aquí implementaremos la lógica diferente para actualizar
    // - Para today: crear nueva fila
    // - Para yesterday: buscar y actualizar fila existente
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
            <UpdateButton onUpdate={() => handleUpdate(false)} />
          </>
        )}
        {activeTab === 'yesterday' && (
          <>
            {Array.isArray(yesterdaySections) && yesterdaySections.map(section => renderSection(section, true))}
            <UpdateButton onUpdate={() => handleUpdate(true)} isYesterday />
          </>
        )}
        {activeTab === 'stats' && (
          <div className="text-center p-4">
            Stats coming soon...
          </div>
        )}
      </main>
    </div>
  );
} 