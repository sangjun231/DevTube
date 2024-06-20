import { useEffect, useState } from 'react';
import SurveyForm from './SurveyForm';
import RecommendationForm from './RecommendationForm';
import AnswerSubmit from './AnswerSubmit';
import { getAuthUser } from '../../lib/supabase/userApi';
import userDataStore from '../../zustand/usreDataStore';

const QuestionForm = () => {
  const [answers, setAnswers] = useState({
    userId: '',
    isMajor: '',
    level: '',
    topics: []
  });
  const [step, setStep] = useState('사전배경입력');
  // const [user, setUser] = useState('');
  // const [getUserId, setGetUserIdData] = useState('');
  const { user, setUser, userIdData, setUserIdData } = userDataStore();

  const onNextSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('요구사항입력');
  };

  const onRecommendationNext = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('답변제출');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getAuthUser();
        setUser(userData);
        setUserIdData(userData.id);
        console.log('userId 값 확인', userData.id);

        if (userData.id) {
          const selection = {};

          setAnswers({
            userId: userData.id,
            isMajor: selection.isMajor || '',
            level: selection.level || '',
            topics: selection.topics || []
          });

          console.log('저장한 상태 데이터(QuestionForm)', {
            userId: userData.id,
            isMajor: selection.isMajor || '',
            level: selection.level || '',
            topics: selection.topics || []
          });
        }
      } catch (e) {
        console.log('데이터 받아오기 오류', e.message);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {step === '사전배경입력' && <SurveyForm onNext={onNextSurvey} answers={answers} setAnswers={setAnswers} />}
      {step === '요구사항입력' && (
        <RecommendationForm onNext={onRecommendationNext} setStep={setStep} answers={answers} setAnswers={setAnswers} />
      )}
      {step === '답변제출' && <AnswerSubmit setStep={setStep} answers={answers} />}
    </div>
  );
};

export default QuestionForm;
