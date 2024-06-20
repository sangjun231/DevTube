import { create } from 'zustand';

const userDataStore = create((set) => ({
  user: '',
  setUser: (user) => set({ user }),
  userIdData: '',
  setUserIdData: (userIdData) => set({ userIdData })
}));

export default userDataStore;
