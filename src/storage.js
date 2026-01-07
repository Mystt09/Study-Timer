import { openDB } from 'idb';
console.log('STORAGE FILE LOADED');

export const dbPromise = openDB('study-timer-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('meta')) {
      db.createObjectStore('meta'); // external key
    }
    if (!db.objectStoreNames.contains('rows')) {
      db.createObjectStore('rows'); // external key
    }
    if (!db.objectStoreNames.contains('sessions')) {
      db.createObjectStore('sessions', { keyPath: 'id' });
    }
  }
});

export async function idbGet(store, key) {
  const db = await dbPromise;
  return db.get(store, key);
}

export async function idbSet(store, key, value) {
  const db = await dbPromise;
  return db.put(store, value, key);
}

export async function idbGetAll(store) {
  const db = await dbPromise;
  return db.getAll(store);
}
