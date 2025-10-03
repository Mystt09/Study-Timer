
// useAutoSaveLogs.js

import { useEffect } from 'react';

export function useAutoSaveLogs(logs) {
  useEffect(() => {
    if (logs.length === 0) return;

    const request = window.indexedDB.open('MyTestDatabase', 3);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('logs', 'readwrite');
      const store = transaction.objectStore('logs');

      logs.forEach(log => {
        store.add(log);  // Save each log to IndexedDB
      });

      console.log('Logs saved to IndexedDB');
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('logs')) {
        db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        console.log('Created object store: logs');
      }
    };
  }, [logs]); // Runs every time `logs` changes



  return (
    <div>
      <h1>IndexedDB Example</h1>
    </div>
  );
}

export default useAutoSaveLogs;
