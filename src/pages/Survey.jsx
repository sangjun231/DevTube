import { useEffect, useState } from 'react';
import AnswerSubmit from '../components/Survey/AnswerSubmit';
import { useQuery } from '@tanstack/react-query';
import { getAuthSession, getAuthUser, userLogout } from '../lib/supabase/userApi';
import { useNavigate } from 'react-router-dom';
import useIsLoginStore from '../zustand/isLoginStore';
import ChooseTopicForm from '../components/Survey/ChooseTopicForm';
import QuestionForm from '../components/Survey/QuestionForm';

const Survey = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useIsLoginStore((state) => state);
  const [answers, setAnswers] = useState({
    isMajor: '',
    level: '',
    topics: []
  });
  const [step, setStep] = useState('사전배경');

  const {
    data: userData,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getAuthUser,
    enabled: !!localStorage.getItem('sb-mrinvkeutvuswhnzkglk-auth-token'),
    retry: false
  });

  const pendingRedirect = async () => {
    if (isPending) {
      const { data } = await getAuthSession();
      if (!data.session) {
        setIsLogin(false);
        userLogout();
        navigate('/login');
        return;
      }
      return <div>로딩중</div>;
    }
  };

  useEffect(() => {
    pendingRedirect();
  }, []);

  if (isError) {
    return <div>`유저의 정보를 불러올 수 없습니다.${error}`</div>;
  }

  const onNextSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('관심사');
  };

  const onChooseTopicNext = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('답변제출');
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {step === '사전배경' && <QuestionForm onNext={onNextSurvey} answers={answers} setAnswers={setAnswers} />}
        {step === '관심사' && (
          <ChooseTopicForm
            onNext={onChooseTopicNext}
            setStep={setStep}
            answers={answers}
            setAnswers={setAnswers}
            userId={userData.id}
          />
        )}
        {step === '답변제출' && <AnswerSubmit setStep={setStep} answers={answers} setAnswers={setAnswers} />}
      </div>
    </>
  );
};

export default Survey;
