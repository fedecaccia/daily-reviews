import React from 'react';
import { Field as FieldType } from '@/types';
import { useState } from 'react';

interface FieldProps {
  field: FieldType;
  onChange: (value: number | boolean | string) => void;
  sectionId: string;
  date: string;
}

export const Field: React.FC<FieldProps> = ({ field, onChange, sectionId, date }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (value: number | boolean | string) => {
    onChange(value);
    
    // Si no es el campo de notas, actualizar inmediatamente
    if (field.id !== 'notes') {
      setIsUpdating(true);
      try {
        const response = await fetch('/api/update-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            sectionId,
            fieldId: field.id,
            value
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update field');
        }
      } catch (error) {
        console.error('Error updating field:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleMinutesChange = (increment: number) => {
    const currentValue = Number(field.value);
    const newValue = currentValue + increment;
    
    // No permitir valores negativos y máximo 240 minutos (4 horas)
    if (newValue >= 0 && newValue <= 240) {
      handleChange(newValue);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'minutes':
        if (field.id === 'fruits') {
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const newValue = Number(field.value) - 1;
                  if (newValue >= 0) handleChange(newValue);
                }}
                className={`px-3 py-1 rounded ${
                  Number(field.value) <= 0 
                    ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                    : 'bg-[var(--button-error)] text-white'
                }`}
                disabled={Number(field.value) <= 0}
              >
                -
              </button>
              <span className="w-16 text-center text-base">{field.value} 🍎</span>
              <button
                onClick={() => {
                  const newValue = Number(field.value) + 1;
                  if (newValue <= 100) handleChange(newValue);
                }}
                className={`px-3 py-1 rounded ${
                  Number(field.value) >= 100 
                    ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                    : 'bg-[var(--button-success)] text-white'
                }`}
                disabled={Number(field.value) >= 100}
              >
                +
              </button>
            </div>
          );
        }
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMinutesChange(-5)}
              className={`px-3 py-1 rounded ${
                Number(field.value) <= 0 
                  ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                  : 'bg-[var(--button-error)] text-white'
              }`}
              disabled={Number(field.value) <= 0}
            >
              -
            </button>
            <span className="w-16 text-center text-base">{field.value} min</span>
            <button
              onClick={() => handleMinutesChange(5)}
              className={`px-3 py-1 rounded ${
                Number(field.value) >= 240 
                  ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                  : 'bg-[var(--button-success)] text-white'
              }`}
              disabled={Number(field.value) >= 240}
            >
              +
            </button>
          </div>
        );
      
      case 'boolean':
        const isDangerousField = field.id.match(/^(acidity|heavy_food|fast_food)$/);
        
        return (
          <div className="flex items-center">
            <div
              onClick={() => handleChange(!field.value)}
              className={`toggle-switch ${field.value ? (isDangerousField ? 'active-danger' : 'active') : ''}`}
              role="switch"
              aria-checked={field.value}
              tabIndex={0}
            />
          </div>
        );
      
      case 'text':
        return (
          <textarea
            value={field.value as string}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full p-2 border rounded mt-2 transition-colors duration-200"
            rows={4}
          />
        );
      
      case 'slider':
        const getSliderColor = (value: number) => {
          // Colores invertidos para el campo de discusiones
          if (field.id === 'couple_discussions') {
            switch (value) {
              case 1:
                return 'var(--color-green-bright)';  // El mismo que nivel 5 de productivity
              case 2:
                return 'var(--color-green)';         // El mismo que nivel 4 de productivity
              case 3:
                return 'var(--color-yellow)';        // El mismo que nivel 3 de productivity
              case 4:
                return 'var(--color-orange)';        // El mismo que nivel 2 de productivity
              case 5:
                return 'var(--color-red)';           // El mismo que nivel 1 de productivity
              default:
                return 'var(--color-green-bright)';
            }
          }
          
          // Colores normales para otros sliders
          switch (value) {
            case 1:
              return 'var(--color-red)';
            case 2:
              return 'var(--color-orange)';
            case 3:
              return 'var(--color-yellow)';
            case 4:
              return 'var(--color-green)';
            case 5:
              return 'var(--color-green-bright)';
            default:
              return 'var(--color-red)';
          }
        };

        return (
          <div className="flex items-center">
            <div 
              className="slider-container relative"
              style={{
                background: getSliderColor(Number(field.value))
              }}
            >
              <div className="slider-track"></div>
              <input
                type="range"
                min="1"
                max="5"
                value={field.value as number}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`mb-4 ${
      field.type === 'text' 
        ? 'block' 
        : 'grid grid-cols-2 gap-4 items-center'
    }`}>
      <label className="font-medium">
        {field.name}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
    </div>
  );
}; 