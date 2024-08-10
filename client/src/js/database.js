import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ id: 1, value: content });
  console.log('Data saved succesfully', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDb = await openDB('jate', 1);
  const store = jateDb.transaction('jate', 'readonly').objectStore('jate');
  const result = await store.get(1);
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');

  return result?.value;
};

initdb();
