import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyForm = ({ answers, setAnswers, onNext }) => {
  // const [answers, setAnswers] = useState({
  //   isMajor: '',
  //   hasFrontendExperience: '',
  //   usedReact: '',
  //   usedZustand: '',
  // });

  //const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(!answers.isMajor || !answers.hasFrontendExperience 
      || !answers.usedReact || !answers.usedZustand) {
      alert('모든 질문에 대답해 주세요!');
      return;
    }
    localStorage.setItem('answers', JSON.stringify(answers));

    
    //console.log(answers);
    onNext(answers);
  };

  

  return (
    <div className="flex items-center justify-center">
      <div className="w-[500px] rounded-lg bg-slate-200 p-8 shadow-lg">
        <h1 className="mb-4 text-left text-xl font-semibold">안녕하세요! 😊</h1>
        <p className="mb-6 text-left ">
          몇가지 간단한 질문에 답변해 주시면, <br />
          알맞는 영상을 추천해 드릴게요!
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-4 flex items-center border-solid border-2 border-gray-400 p-4 rounded-2xl justify-between">
            <label className="mr-4 block font-medium">전공자이신가요?</label>
            <div className="flex space-x-4">
              <label>
                <input 
                  type="radio" 
                  name="isMajor" 
                  value="yes" 
                  onChange={onChange} 
                  className="mr-2"
                  checked={answers.isMajor === 'yes'}
                  required
                />
                  예
              </label>
              <label>
                <input 
                  type="radio" 
                  name="isMajor" 
                  value="no" 
                  onChange={onChange} 
                  className="mr-2" 
                  checked={answers.isMajor === 'no'}
                  required
                />
                아니요
              </label>
            </div>
          </div>
          <div className="mb-4 flex items-center border-solid border-2 border-gray-400 p-4 rounded-2xl justify-between">
            <label className="mr-4 block font-medium">웹 개발 프론트엔드 경험이 있으신가요?</label>
            <div className="flex space-x-4">
              <label>
                <input 
                  type="radio" 
                  name="hasFrontendExperience" 
                  value="yes" 
                  onChange={onChange} 
                  className="mr-2" 
                  required
                  checked={answers.hasFrontendExperience === 'yes'}
                  />
                  예
              </label>
              <label>
                <input 
                  type="radio" 
                  name="hasFrontendExperience" 
                  value="no" 
                  onChange={onChange} 
                  className="mr-2" 
                  required
                  checked={answers.hasFrontendExperience === 'no'}
                />
                아니요
              </label>
            </div>
          </div>
          <div className="mb-4 flex items-center border-solid border-2 border-gray-400 p-4 rounded-2xl justify-between">
            <label className="mr-4 block font-medium">리액트를 사용해본 적이 있으신가요?</label>
            <div className="flex space-x-4 ">
              <label>
                <input 
                  type="radio" 
                  name="usedReact" 
                  value="yes" 
                  onChange={onChange} 
                  className="mr-2" 
                  required
                  checked={answers.usedReact === 'yes'}
                />
                  예
              </label>
              <label>
                <input 
                  type="radio" 
                  name="usedReact" 
                  value="no" 
                  onChange={onChange} 
                  className="mr-2" 
                  required
                  checked={answers.usedReact === 'no'}
                />
                아니요
              </label>
            </div>
          </div>
          <div className="mb-6 flex items-center border-solid border-2 border-gray-400 p-4 rounded-2xl justify-between">
            <label className="mr-4 block font-medium">주스탠드를 써보셨나요?</label>
            <div className="flex space-x-4">
              <label>
                <input 
                  type="radio" 
                  name="usedZustand" 
                  value="yes" 
                  onChange={onChange} 
                  className="mr-2" 
                  required
                  checked={answers.usedZustand === 'yes'}
                />
                예
              </label>
              <label>
                <input 
                  type="radio" 
                  name="usedZustand" 
                  value="no" 
                  onChange={onChange} 
                  className="mr-2"
                  required
                  checked={answers.usedZustand === 'no'}
                />
                아니요
              </label>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full rounded-lg bg-black px-4 py-2 font-semibold text-white shadow-md">
            계속하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
