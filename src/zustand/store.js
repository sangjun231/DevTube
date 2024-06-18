import { create } from 'zustand';

const userDataStore = create((set) => {
  return {
    answer: {
      isMajor: '',
      hasFrontendExperience: '',
      usedReact: '',
      usedZustand: '',
      level: '',
      topics: []
    },
    setAnswers: (newAnswers) =>
      set((state) => {
        return {
          answers: { ...state.answers, ...newAnswers }
        };
      }),
    step: '사전배경입력',
    setStep: (newStep) =>
      set(() => {
        return {
          step: newStep
        };
    }),
    backStep: '', 
    setBackStep: (backStep) => {
      set(()=> {
        return {
          backStep: backStep
        }
      })
    }
    };
});
