import { useEffect, useState } from 'react';
import SurveyForm from './SurveyForm';
import RecommendationForm from './RecommendationForm';
import AnswerSubmit from './AnswerSubmit';
import { useQuery } from '@tanstack/react-query';
import { getAuthSession, getAuthUser, userLogout } from '../../lib/supabase/userApi';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useIsLoginStore from '../../zustand/isLoginStore';

const QuestionForm = () => {
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
  }; //

  useEffect(() => {
    pendingRedirect();
  }, []);

  if (isError) {
    return <div>`유저의 정보를 불러 올 수 없습니다.${error}`</div>;
  }

  const onNextSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('관심사');
  };

  const onRecommendationNext = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('답변제출');
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {step === '사전배경' && <SurveyForm onNext={onNextSurvey} answers={answers} setAnswers={setAnswers} />}
        {step === '관심사' && (
          <RecommendationForm
            onNext={onRecommendationNext}
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

export default QuestionForm;
