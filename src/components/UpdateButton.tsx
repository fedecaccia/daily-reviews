'use client';

import { useState, useEffect } from 'react';

interface UpdateButtonProps {
  onUpdate: () => Promise<void>;
  isYesterday?: boolean;
  sections: any[];
  date: string;
  initialNotes: string;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ 
  onUpdate, 
  isYesterday, 
  sections, 
  date,
  initialNotes 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Detectar cambios en las notas
  useEffect(() => {
    const notesSection = sections.find(s => s.id === 'notes');
    const currentNotes = notesSection?.fields[0].value || '';
    const initialNotesValue = initialNotes || '';
    
    const hasChanged = currentNotes !== initialNotesValue;
    setHasChanges(hasChanged);
  }, [sections, initialNotes]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const notesSection = sections.find(s => s.id === 'notes');
      const notes = notesSection?.fields[0].value || '';

      const response = await fetch('/api/update-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          notes
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      setHasChanges(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleUpdate}
      disabled={isUpdating || !hasChanges}
      className={`
        w-full
        px-6 py-2 
        rounded-full 
        ${!hasChanges 
          ? 'bg-[var(--color-disabled)] text-[var(--text-secondary)]' 
          : 'bg-[var(--button-success)] text-white'
        }
        font-medium 
        shadow-lg 
        hover:opacity-90 
        transition-all
        disabled:opacity-50 
        disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        mt-8
      `}
    >
      {isUpdating ? (
        <>
          <span className="animate-spin">⟳</span>
          <span>Updating...</span>
        </>
      ) : !hasChanges ? (
        <>
          <span>✓</span>
          <span>Updated!</span>
        </>
      ) : (
        <>
          <span>↑</span>
          <span>Update {isYesterday ? 'Yesterday' : 'Today'}</span>
        </>
      )}
    </button>
  );
}; 