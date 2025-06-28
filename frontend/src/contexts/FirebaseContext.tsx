'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { app, analytics, db, auth } from '../lib/firebase';

interface FirebaseContextType {
  app: typeof app;
  analytics: typeof analytics;
  db: typeof db;
  auth: typeof auth;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const value = {
    app,
    analytics,
    db,
    auth,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
} 