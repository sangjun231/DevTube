import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import RecommendationForm from './RecommendationForm';
import AnswerSubmit from './AnswerSubmit';

const QuestionForm = () => {
  // 유저id 받아와서 answers에 값을 같이 넣어줘야 하나?
  const [answers, setAnswers] = useState({
    isMajor: '',
    hasFrontendExperience: '',
    usedReact: '',
    usedZustand: '',
    level: '',
    topics: []
  });


  const [step, setStep] = useState('사전배경입력');
  const navigate = useNavigate();

  const onNextSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('요구사항입력');
  };

  const onRecommendationNext = (data) => {
    setAnswers({ ...answers, ...data });
    setStep('답변제출');
  };

  const onSumbitSurvey = (data) => {
    setAnswers({ ...answers, ...data });
    //db 제출 로직 추가
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center h-full mt-20'>
      {/* 상태관리로 변경 */}
      {step === '사전배경입력' && <SurveyForm onNext={onNextSurvey} answers={answers} setAnswers={setAnswers}/>}
      {step === '요구사항입력' && <RecommendationForm onNext={onRecommendationNext} setStep={setStep} answers={answers} setAnswers={setAnswers}/>}
      {step === '답변제출' && <AnswerSubmit onNext={onSumbitSurvey} setStep={setStep}  answers={answers}/>}
    </div>
  );
};

export default QuestionForm;