'use client';

import { useFirebase } from '../contexts/FirebaseContext';
import { useState, useEffect } from 'react';

export default function FirebaseTest() {
  const { db, auth } = useFirebase();
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Test Firebase connection
    if (db && auth) {
      setConnectionStatus('✅ Firebase connected successfully!');
    } else {
      setConnectionStatus('❌ Firebase connection failed');
    }
  }, [db, auth]);

  return (
    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-2">
        Firebase Connection Test
      </h3>
      <p className="text-green-700">{connectionStatus}</p>
      <p className="text-sm text-green-600 mt-2">
        Database: {db ? '✅ Connected' : '❌ Not connected'}
      </p>
      <p className="text-sm text-green-600">
        Authentication: {auth ? '✅ Connected' : '❌ Not connected'}
      </p>
    </div>
  );
} 