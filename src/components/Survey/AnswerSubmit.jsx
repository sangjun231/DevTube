import { useNavigate } from 'react-router-dom';

const AnswerSubmit = ({ setStep, setAnswers }) => {
  const navigate = useNavigate();

  const onBackStep = () => {
    setStep('관심사');
    setAnswers((prevAnswers) => ({ ...prevAnswers, topics: [] }));
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="text mb-5 text-center text-3xl font-bold">답변제출 완료 🙌</div>
          <p className="text-xl">답변이 제출되었습니다! </p>
          <p className="text-xl">추천 영상을 확인해보세요! </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-10 w-60 rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md"
        onClick={() => navigate('/')}
      >
        영상보러 가기
      </button>
      <button
        className="mt-8 cursor-pointer underline"
        onClick={onBackStep}
      >
        이전으로
      </button>
    </div>
  );
};

export default AnswerSubmit;
