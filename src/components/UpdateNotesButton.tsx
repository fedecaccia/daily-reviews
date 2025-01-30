'use client';

import { useState, useEffect } from 'react';

interface UpdateNotesButtonProps {
  notes: string;
  initialNotes: string;
  date: string;
  onUpdate?: () => void;
}

export const UpdateNotesButton: React.FC<UpdateNotesButtonProps> = ({ 
  notes, 
  initialNotes, 
  date,
  onUpdate 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSavedNotes, setLastSavedNotes] = useState(initialNotes);

  // Detectar cambios en las notas
  useEffect(() => {
    const currentNotes = notes || '';
    const savedNotes = lastSavedNotes || '';
    const changed = currentNotes !== savedNotes;
    console.log('Notes state:', { 
      current: currentNotes, 
      saved: savedNotes, 
      initial: initialNotes,
      changed 
    });
    setHasChanges(changed);
  }, [notes, lastSavedNotes]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/update-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          notes: notes || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      setLastSavedNotes(notes);
      onUpdate?.();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
      setHasChanges(false);
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
        mt-4
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
          <span>Updated</span>
        </>
      ) : (
        <>
          <span>↑</span>
          <span>Update</span>
        </>
      )}
    </button>
  );
}; 