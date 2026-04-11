import { useState } from 'react';

export function useContactSales() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => { setIsOpen(false); setIsSent(false); };
  const confirm = () => setIsSent(true);

  return { isOpen, isSent, open, close, confirm };
}
