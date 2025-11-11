import { create } from 'zustand';
export var useGlobalStore = create(function (set) {
  return {
    user: null,
    theme: 'light',
    setUser: function setUser(user) {
      return set({
        user: user
      });
    },
    toggleTheme: function toggleTheme() {
      return set(function (state) {
        return {
          theme: state.theme === 'light' ? 'dark' : 'light'
        };
      });
    }
  };
});