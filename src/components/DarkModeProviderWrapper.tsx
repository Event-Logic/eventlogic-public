'use client';

import { DarkModeProvider } from '@/context/DarkModeContext';
import { ReactNode } from 'react';

export default function DarkModeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
