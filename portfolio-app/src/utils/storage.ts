export const loadLocalJSON = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.warn("Failed to parse local storage", error);
    return fallback;
  }
};

export const persistLocalJSON = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to save to local storage", error);
  }
};

export const downloadBackup = (payload: unknown, filename: string) => {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const restoreBackupFromFile = <T>(
  file: File
): Promise<T | undefined> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as T;
        resolve(parsed);
      } catch (error) {
        console.error("Failed to parse backup", error);
        resolve(undefined);
      }
    };
    reader.readAsText(file);
  });
};

