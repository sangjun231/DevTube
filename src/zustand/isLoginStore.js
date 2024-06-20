import { create } from 'zustand';

const useIsLoginStore = create((set) => {
  return {
    isLogin: false,
    setIsLogin: (payload) =>
      set(() => ({
        isLogin: payload
      }))
  };
});

export default useIsLoginStore;
