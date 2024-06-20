import { create } from 'zustand';

const useIdStore = create((set) => {
  return {
    id: '',
    setId: (payload) =>
      set(() => ({
        id: payload
      }))
  };
});

export default useIdStore;
