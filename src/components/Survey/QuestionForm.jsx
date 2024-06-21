import { toast } from 'react-toastify';

const QuestionForm = ({ answers, setAnswers, onNext }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const onNextSubmit = (e) => {
    e.preventDefault();

    if (!answers.isMajor || !answers.level) {
      toast.error('모든 질문에 대답해 주세요!');
      return;
    }

    onNext(answers);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[550px] rounded-lg bg-slate-200 p-8 shadow-lg">
        <h1 className="mb-4 text-left text-xl font-semibold">안녕하세요! 😊</h1>
        <p className="mb-6 text-left">
          몇 가지 간단한 질문에 답변해주시면, <br />
          알맞은 영상을 추천해드릴게요!
        </p>
        <form onSubmit={onNextSubmit}>
          <div className="mb-4 flex items-center justify-between rounded-2xl border-2 border-solid border-gray-400 p-4">
            <label className="mr-4 block text-lg font-medium">전공자이신가요?</label>
            <div className="flex space-x-4">
              <label className="text-lg">
                <input
                  type="radio"
                  name="isMajor"
                  value="전공자"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.isMajor === '전공자'}
                />
                예
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="isMajor"
                  value="비전공자"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.isMajor === '비전공자'}
                />
                아니요
              </label>
            </div>
          </div>
          <div className="mb-4 flex flex-col justify-between rounded-2xl border-2 border-solid border-gray-400 p-4">
            <label className="items-left mb-4 mr-4 block text-lg font-medium">본인의 수준을 골라주세요.</label>
            <div className="flex justify-end space-x-4">
              <label className="text-lg">
                <input
                  type="radio"
                  name="level"
                  value="입문"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.level === '입문'}
                />
                입문
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="level"
                  value="초급"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.level === '초급'}
                />
                초급
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="level"
                  value="중급"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.level === '중급'}
                />
                중급
              </label>
              <label className="text-lg">
                <input
                  type="radio"
                  name="level"
                  value="고급"
                  onChange={onChange}
                  className="mr-2"
                  checked={answers.level === '고급'}
                />
                고급
              </label>
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md">
            계속하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
