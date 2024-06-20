import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnswerSubmit = ({  answers, setStep, setAnswers}) => {
  const navigate = useNavigate();
  // console.log('제출 페이지',answers);

  return (
    <div className='flex flex-col text-center items-center'>
      <div className='flex flex-row mt-40'>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="text text-center font-bold mb-5 text-3xl">답변제출 완료 🙌</div>
          <p className='text-xl'>답변이 제출되었습니다! </p>
          <p className='text-xl'>추천 영상을 확인해보세요! </p>
        </div>
      </div>
      <button
        type="button"
        className="w-60 rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md mt-10"
        onClick={() => navigate('/')}
      >
        영상보러 가기
      </button>
      <button className="mt-8 underline  cursor-pointer" onClick={() => {
          setStep('관심사');
          setAnswers((prevAnswers) => ({ ...prevAnswers, topics: [] }));
          // localStorage.setItem('answers', JSON.stringify({ ...answers, topics: [] }));
        }}>
        이전으로
      </button>
    </div>
  );
};

export default AnswerSubmit;
