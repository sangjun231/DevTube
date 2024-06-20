import { useNavigate } from 'react-router-dom';
import { surveyApi } from '../../lib/supabase/surveyApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const RecommendationForm = ({ answers, setAnswers, onNext, setStep, userId }) => {
  const navigate = useNavigate();

  const topics = [
    'HTML',
    'CSS',
    'Sass',
    'Tailwind CSS',
    'styled-components',
    'JavaScript',
    'React',
    'TypeScript',
    'Next.js ',
    'Vue.js',
    'Redux Toolkit',
    'Zustand',
    'Jotai',
    'Recoil',
    'React Native',
    'Nuxt.js'
  ];

  const recommendMutation = useMutation({
    mutationFn: async ({ answers, userId }) => await surveyApi({ answers, userId }),
    onSuccess: () => {
      onNext(answers);
    },
    onError: (e) => {
      console.error('답변 제출에 실패:', e.message);
      toast.error('답변 제출에 실패했습니다. 다시 시도해 주세요.');
      navigate(0);
    }
  });

  const onTopicChange = (e) => {
    const { value, checked } = e.target;

    setAnswers((prevAnswers) => {
      let updatedTopics;
      if (checked) {
        updatedTopics = [...new Set([...prevAnswers.topics, value])];
      } else {
        updatedTopics = prevAnswers.topics.filter((topic) => topic !== value);
      }

      return {
        ...prevAnswers,
        topics: updatedTopics
      };
    });
  };

  const onSubmitSurvey = async (e) => {
    e.preventDefault();

    if (answers.topics.length === 0) {
      toast.info('관심있는 키워드를 선택해주세요');
      return;
    }

    setAnswers(answers);
    console.log('제출할 데이터 준비', answers);

    console.log(userId);
    recommendMutation.mutate({ answers, userId });
  };

  return (
    <>
      <div className="mt-1 flex flex-col items-center justify-center">
        <div className="w-[550px] rounded-lg bg-slate-200 p-8 shadow-lg">
          <h1 className="mb-4 text-left text-xl font-semibold">마지막 질문이에요! 😊</h1>
          <p className="mb-6 text-left">관심사에 따른 영상을 추천해드릴게요!</p>
          <form onSubmit={onSubmitSurvey}>
            <div className="mb-6 flex flex-col rounded-2xl border-2 border-solid border-gray-400 p-4">
              <label className="mb-2 block text-lg font-medium">관심 있는 기술 스택을 골라주세요</label>
              <div className="grid grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <label key={topic} className="flex items-center">
                    <input type="checkbox" value={topic} onChange={onTopicChange} className="mr-2" />
                    {topic}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md"
            >
              제출하기
            </button>
          </form>
        </div>
        <button className="mt-4 cursor-pointer underline" onClick={() => setStep('사전배경')}>
          이전으로
        </button>
      </div>
    </>
  );
};

export default RecommendationForm;
