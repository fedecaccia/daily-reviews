'use client';

import { useState } from 'react';

interface UpdateButtonProps {
  onUpdate: () => Promise<void>;
  isYesterday?: boolean;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ onUpdate, isYesterday = false }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await onUpdate();
      // Mostrar feedback de éxito
      alert(`${isYesterday ? 'Yesterday' : 'Today'} updated successfully!`);
    } catch (error) {
      // Mostrar feedback de error
      console.error('Update failed:', error);
      alert('Failed to update. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleUpdate}
      disabled={isUpdating}
      className={`
        w-full
        px-6 py-2 
        rounded-full 
        bg-[var(--button-success)] 
        text-white 
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
      ) : (
        <>
          <span>↑</span>
          <span>Update {isYesterday ? 'Yesterday' : 'Today'}</span>
        </>
      )}
    </button>
  );
}; 