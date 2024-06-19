import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import RecommendationForm from './RecommendationForm';
import AnswerSubmit from './AnswerSubmit';
import { getUserIdApi, surveyApi } from '../../lib/supabase/surveyApi';

const QuestionForm = () => {
  const [answers, setAnswers] = useState({
    userId: '',
    isMajor: '',
    hasFrontendExperience: '',
    usedReact: '',
    usedZustand: '',
    level: '',
    topics: []
  });

  const [step, setStep] = useState('사전배경입력');
  // const userId = '32c50ec5-7438-4735-850f-d3acf8a24190';

  const onNextSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('요구사항입력');
  };

  const onRecommendationNext = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('답변제출');
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const userId = '32c50ec5-7438-4735-850f-d3acf8a24193';
  //       const getUserId = await getUserApi(userId);
  //       console.log('받아온 유저 아이디 확인', userData);
  //       setAnswers({...answers, userId : userData});
  //       console.log('아이디 포함 저장 데이터', answers);
  //       //if (userId) {
  //         //const selection = user.selection || {};

  //         // setAnswers({
  //         //   userId: user.id,
  //         //   isMajor: selection.isMajor || '',
  //         //   hasFrontendExperience: selection.hasFrontendExperience || '',
  //         //   usedReact: selection.usedReact || '',
  //         //   usedZustand: selection.usedZustand || '',
  //         //   level: selection.level || '',
  //         //   topics: selection.topics || []
  //         // });

  //         console.log('저장한 상태 데이터', answers);
  //      // }
  //     } catch (e) {
  //       console.log('데이터 받아오기 오류', e.message);
  //     }
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = 'faaa3839-18ee-4064-87f4-9bdc994b4bde';
        const getUserId = await getUserIdApi(userId);
        console.log('userId 값 확인', getUserId);

        if (getUserId) {
          const selection = {};

          setAnswers({
            userId: getUserId,
            isMajor: selection.isMajor || '',
            hasFrontendExperience: selection.hasFrontendExperience || '',
            usedReact: selection.usedReact || '',
            usedZustand: selection.usedZustand || '',
            level: selection.level || '',
            topics: selection.topics || []
          });

          console.log('저장한 상태 데이터(QuestionForm)', {
            userId: getUserId,
            isMajor: selection.isMajor || '',
            hasFrontendExperience: selection.hasFrontendExperience || '',
            usedReact: selection.usedReact || '',
            usedZustand: selection.usedZustand || '',
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
    <div className="mt-6 flex items-center justify-center">
      {/* 상태관리로 변경 필요 ? */}
      {step === '사전배경입력' && <SurveyForm onNext={onNextSurvey} answers={answers} setAnswers={setAnswers} />}
      {step === '요구사항입력' && (
        <RecommendationForm onNext={onRecommendationNext} setStep={setStep} answers={answers} setAnswers={setAnswers} />
      )}
      {step === '답변제출' && <AnswerSubmit setStep={setStep} answers={answers} />}
    </div>
  );
};

export default QuestionForm;
