import React from 'react';
// import logo from '../../assets/Devtube_logo.png'

const AnswerSubmit = ({ onNext, answers, setStep }) => {

  console.log(answers);

  return (
    <div className='flex flex-col text-center items-center'>
      <div className='flex flex-row mt-40'>
      {/* <img src={logo} alt="DevTube_logo"className='h-full' /> */}
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="text text-center font-bold mb-5 text-3xl">답변제출 완료 🙌</div>
          <p className='text-xl'>답변이 제출되었습니다! </p>
          <p className='text-xl'>추천 영상을 확인해보세요! </p>
        </div>
      </div>
      <button
        type="button"
        className="w-60 rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md mt-10"
        onClick={onNext}
      >
        영상보러 가기
      </button>
      <button className="mt-10 underline" onClick={() => setStep('요구사항입력')}>이전으로</button>
    </div>
  );
};

export default AnswerSubmit;
