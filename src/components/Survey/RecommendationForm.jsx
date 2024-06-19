import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { surveyApi } from '../../lib/supabase/surveyApi';
import { toast } from 'react-toastify';

const RecommendationForm = ({ answers, setAnswers, onNext, setStep }) => {
  // const [level, setLevel] = useState('');
  // const [topics, setTopics] = useState([]);

  const onLevelChange = (e) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      level: value
    }));
  };

  const onTopicChange = (e) => {
    const { value, checked } = e.target; // value는 선택항목 이름, zustand, react등등

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      topics: checked
        ? [...prevAnswers.topics, value]
        : prevAnswers.topics.filter((topic) => topic !== value),
    }));
    //console.log(answers)
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (!answers.level) {
  //     alert('추천받고 싶은 영상의 난이도를 선택해주세요');
  //     return;
  //   }

  //   if(answers.topics.length === 0) {
  //     alert('추천받고 싶은 영상의 키워드를 선택해주세요');
  //     return;
  //   }
  //   localStorage.setItem('answers', JSON.stringify(answers));

  //   onNext(answers);
  // };

  const onSubmitSurvey = async (e) => {
    e.preventDefault();
  
    if (!answers.level) {
      alert('추천받고 싶은 영상의 난이도를 선택해주세요');
      return;
    }
  
    if (answers.topics.length === 0) {
      alert('추천받고 싶은 영상의 키워드를 선택해주세요');
      return;
    }
  
    setAnswers({ ...answers });
    console.log('제출할 데이터 준비', answers);
  
    try {
      const userAnswer = await surveyApi(answers);
      console.log('제출용 answers', answers);
      toast.success('답변이 제출되었습니다.');
      // localStorage.setItem('answers', JSON.stringify(answers));
  
      onNext(answers);
    } catch (e) {
      console.error('Error submitting survey:', e.message);
      alert('답변 제출에 실패했습니다. 다시 시도해 주세요.');
      setStep('사전배경입력');
    }
  };

  // const savedAnswers = JSON.parse(localStorage.getItem('answers'));

  // useEffect(() => {
  //   if (savedAnswers) {
  //     setAnswers(savedAnswers);
  //   }
  // }, []); 

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[500px] rounded-lg bg-slate-200 p-8 shadow-lg">
        <h1 className="mb-4 text-left text-xl font-semibold">안녕하세요! 😊</h1>
        <p className="mb-6 text-left">
          몇가지 간단한 질문에 답변해 주시면, <br />
          알맞는 영상을 추천해 드릴게요!
        </p>
        <form onSubmit={onSubmitSurvey}>
          <div className="mb-4 flex flex-col rounded-2xl border-2 border-solid border-gray-400 p-4">
            <label className="mb-2 block font-medium">추천받고 싶은 영상의 난이도를 선택해주세요.</label>
            <div className="flex justify-end space-x-4">
              <label>
                <input
                  type="radio"
                  name="level"
                  value="basic"
                  checked={answers.level === 'basic'}
                  onChange={onLevelChange}
                  className="mr-2"
                />
                베이직
              </label>
              <label>
                <input
                  type="radio"
                  name="level"
                  value="standard"
                  checked={answers.level === 'standard'}
                  onChange={onLevelChange}
                  className="mr-2"
                />
                스탠다드
              </label>
              <label>
                <input
                  type="radio"
                  name="level"
                  value="challenge"
                  checked={answers.level === 'challenge'}
                  onChange={onLevelChange}
                  className="mr-2"
                />
                챌린지
              </label>
            </div>
          </div>
          <div className="mb-6 flex flex-col rounded-2xl border-2 border-solid border-gray-400 p-4">
            <label className="mb-2 block font-medium">무엇에 관련된 영상을 추천받고싶나요?</label>
            <div className="grid grid-cols-2 gap-4">
              {['Zustand', 'React', 'TypeScript', 'Redux Toolkit', 'next.js', 'JavaScript'].map((topic) => (
                <label key={topic} className="flex items-center">
                  <input type="checkbox" value={topic} onChange={onTopicChange} className="mr-2" />
                  {topic}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md">
            제출하기
          </button>
        </form>
      </div>
      <button className="mt-8 underline" onClick={() => setStep('사전배경입력')}>
        이전으로
      </button>
    </div>
  );
};

export default RecommendationForm;
