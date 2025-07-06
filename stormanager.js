// storageManager.js
// Utility module for handling local data in a browser (offline-friendly)
// Author: [TuoNome] - For educational purposes only

const StorageManager = (() => {
  const prefix = 'nomadeDigi_';

  function save(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(prefix + key, serialized);
      return true;
    } catch (e) {
      console.error('StorageManager: Failed to save data', e);
      return false;
    }
  }

  function load(key) {
    try {
      const raw = localStorage.getItem(prefix + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('StorageManager: Failed to load data', e);
      return null;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(prefix + key);
    } catch (e) {
      console.error('StorageManager: Failed to remove data', e);
    }
  }

  function clearAll() {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(prefix)) {
        localStorage.removeItem(k);
      }
    });
  }

  // Simulated sync (fake network delay + console log)
  async function syncToServer(key) {
    const data = load(key);
    if (!data) {
      console.warn(`No data found under key '${key}' to sync.`);
      return;
    }
    console.log(`Syncing '${key}' to server...`);
    await new Promise(res => setTimeout(res, 1000)); // Fake delay
    console.log(`Data for '${key}' synced successfully (fake).`);
  }

  return {
    save,
    load,
    remove,
    clearAll,
    syncToServer,
  };
})();

// Example usage
// StorageManager.save('profile', { name: 'Alice', online: false });
// const profile = StorageManager.load('profile');
// StorageManager.syncToServer('profile');

export default StorageManager;
