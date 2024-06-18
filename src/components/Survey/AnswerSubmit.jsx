import React from 'react';
import logo from '../../../public/img/12logo.png'

const AnswerSubmit = ({ onNext, answers, setStep }) => {

  console.log(answers);

  return (
    <div className='flexx flex-col text-center'>
      <div className='flex flex-row mt-20'>
        <img src={logo} alt="DevTube_logo" />
        <div className="flex h-full flex-col items-center justify-center gap-y-2 ml-5">
          <div className="text text-center font-bold mb-5 text-2xl">답변제출 완료 🙌</div>
          <p>답변이 제출되었습니다! </p>
          <p>추천 영상을 확인해보세요! </p>
          <button
            type="button"
            className="w-70 rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md mt-5"
            onClick={onNext}
          >
            영상보러 가기
          </button>
        </div>
      </div>
      <button className="mt-7 underline" onClick={() => setStep('요구사항입력')}>이전으로</button>
    </div>
  );
};

export default AnswerSubmit;
