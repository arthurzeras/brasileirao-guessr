export const STORAGE_ID_KEY = "brasileirao-guessr-status";

interface ValuesInStorage {
  day: string;
  gameWin: boolean;
  gameOver: boolean;
  teamsAttempted: string[];
  remainingAttempts: number;
}

export const storage = {
  get: (): Record<string, ValuesInStorage> => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem(STORAGE_ID_KEY) || "{}");
    }

    return {};
  },
  getToday: () => {
    const today = new Date().toLocaleDateString("pt-BR");
    return storage.get()[today];
  },
  getDay: (day: string) => {
    const values = storage.get();

    if (!(day in Object.keys(values))) {
      return {};
    }

    return storage.get()[day];
  },
  set: (params: Record<string, any>) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_ID_KEY, JSON.stringify(params));
    }
  },
  saveAnswer(params: ValuesInStorage) {
    const currentValues = storage.get();
    const valuesToUpdate = { [params.day]: params };

    storage.set({ ...currentValues, ...valuesToUpdate });
  },
};
