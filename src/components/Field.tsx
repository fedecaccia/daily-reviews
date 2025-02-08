import React from 'react';
import { Field as FieldType } from '@/types';

interface FieldProps {
  field: FieldType;
  onChange: (value: number | boolean | string) => void;
  sectionId: string;
  date: string;
}

export const Field: React.FC<FieldProps> = ({ field, onChange, sectionId, date }) => {
  const handleChange = async (value: number | boolean | string) => {
    onChange(value);
    
    // Si no es el campo de notas, actualizar inmediatamente
    if (field.id !== 'notes') {
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
      }
    }
  };

  const handleMinutesChange = (increment: boolean, bigIncrement: boolean = false) => {
    const currentValue = Number(field.value);
    const step = field.step || 5; // Si no hay step definido, usar 5 como valor por defecto
    const newValue = currentValue + (increment ? (bigIncrement ? step * 2 : step) : -step);
    
    // Manejar límites según el tipo de campo
    if (field.id === 'swimming') {
      // Para swimming, permitir hasta 10000m
      if (newValue >= 0 && newValue <= 10000) {
        handleChange(newValue);
      }
    } else if (field.id.includes('systolic') || field.id.includes('diastolic')) {
      // Para presión arterial, máximo 300
      if (newValue >= 0 && newValue <= 300) {
        handleChange(newValue);
      }
    } else {
      // Para otros campos de minutos, máximo 480 (8 horas)
      if (newValue >= 0 && newValue <= 480) {
        handleChange(newValue);
      }
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
        const isPressureField = field.id.includes('systolic') || field.id.includes('diastolic');
        const isSwimmingField = field.id === 'swimming';
        
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleMinutesChange(false)}
              className={`px-3 py-1 rounded ${
                Number(field.value) <= 0 
                  ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                  : 'bg-[var(--button-error)] text-white'
              }`}
              disabled={Number(field.value) <= 0}
            >
              -
            </button>
            <span className="w-16 text-center text-base">
              {field.value} {field.unitLabel || (isPressureField ? 'mmHg' : 'min')}
            </span>
            <button
              onClick={() => handleMinutesChange(true)}
              className={`px-3 py-1 rounded ${
                Number(field.value) >= (isSwimmingField ? 10000 : isPressureField ? 300 : 480)
                  ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                  : 'bg-[var(--button-success)] text-white'
              }`}
              disabled={Number(field.value) >= (isSwimmingField ? 10000 : isPressureField ? 300 : 480)}
            >
              +
            </button>
            {(isPressureField || isSwimmingField) && (
              <button
                onClick={() => handleMinutesChange(true, true)}
                className={`px-2 py-1 rounded ${
                  Number(field.value) >= (isSwimmingField ? 10000 : 300)
                    ? 'bg-[var(--color-disabled)] cursor-not-allowed' 
                    : 'bg-[var(--button-success)] text-white'
                }`}
                disabled={Number(field.value) >= (isSwimmingField ? 10000 : 300)}
              >
                ++
              </button>
            )}
          </div>
        );
      
      case 'boolean':
        const isDangerousField = field.id.match(/^(acidity|heavy_food|fast_food|nail_biting)$/);
        
        return (
          <div className="flex items-center">
            <div
              onClick={() => handleChange(!field.value)}
              className={`toggle-switch ${field.value ? (isDangerousField ? 'active-danger' : 'active') : ''}`}
              role="switch"
              aria-checked={Boolean(field.value)}
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
        ? 'w-full block' 
        : 'grid grid-cols-2 gap-4 items-center'
    }`}>
      {field.name && (
        <label className="font-medium text-[var(--text-primary)]">
          {field.name}
        </label>
      )}
      <div className={field.type === 'text' ? 'w-full' : ''}>
        {renderField()}
      </div>
    </div>
  );
}; 