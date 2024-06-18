import { create } from 'zustand';

const useModalStore = create((set) => {
  return {
    modal: false,
    toggle: () => {
      set((state) => {
        return { modal: !state.modal };
      });
    },
    confirmModal: false,
    confirmToggle: () => {
      set((state) => {
        return { confirmModal: !state.modal };
      });
    }
  };
});

export default useModalStore;
