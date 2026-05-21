let isAuth = false;

const listeners: (() => void)[] = [];

export const authStore = {
  getIsAuth: () => isAuth,

  setIsAuth: (value: boolean) => {
    isAuth = value;
    listeners.forEach((l) => l());
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  },
};
