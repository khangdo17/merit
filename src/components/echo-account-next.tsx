'use client';

import { useEcho } from '@merit-systems/echo-next-sdk/client';
import { EchoAccountButton } from './echo-account';
import { Button } from '@/components/ui/button';
import { applyMode, getStoredMode, setMode, type ThemeMode } from '@/lib/theme-mode';
import { useEffect, useState } from 'react';

export function EchoAccount() {
  const echo = useEcho();
  const [mode, setModeState] = useState<ThemeMode>('default');

  useEffect(() => {
    const m = getStoredMode();
    setModeState(m);
    applyMode(m);
  }, []);

  const cycleMode = () => {
    const order: ThemeMode[] = ['default', 'cyberpunk', 'darkfantasy'];
    const idx = order.indexOf(mode);
    const next = order[(idx + 1) % order.length];
    setMode(next);
    setModeState(next);
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="secondary" onClick={cycleMode} className="whitespace-nowrap">
        {mode === 'default' ? 'Default' : mode === 'cyberpunk' ? 'Cyberpunk' : 'Dark Fantasy'}
      </Button>
      <EchoAccountButton echo={echo} />
    </div>
  );
}
