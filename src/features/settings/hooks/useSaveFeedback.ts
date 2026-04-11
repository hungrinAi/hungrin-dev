import { useState, useCallback } from 'react';

/** Gives a brief "Saved!" success state to any save button. */
export function useSaveFeedback(durationMs = 2000) {
  const [saved, setSaved] = useState(false);

  const triggerSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), durationMs);
  }, [durationMs]);

  return { saved, triggerSave };
}
