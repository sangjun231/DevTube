import create from 'zustand';

const useDataStore = create((set) => ({
  user: '',
  setUser: (user) => set({ user }),
  userIdData: '',
  setUserIdData: (userIdData) => set({ userIdData }),
}));

export default useDataStore;