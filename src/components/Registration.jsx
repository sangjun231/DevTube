import React from 'react';

const Registration = () => {
  return (
    <form className="flex w-1/3 flex-col items-center justify-center gap-12 border border-black p-12">
      <h1 className="text-xl font-bold">회원가입</h1>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="w-full">
          <label>
            이메일
            <input className="mt-1 w-full border-b border-black p-2 outline-0" type="email" />
          </label>
        </div>
        <div className="w-full">
          <label>
            닉네임
            <input className="mt-1 w-full border-b border-black p-2 outline-0" type="text" />
          </label>
        </div>
        <div className="w-full">
          <label>
            비밀번호
            <input className="mt-1 w-full border-b border-black p-2 outline-0" type="password" />
          </label>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <button className="w-full bg-purple-300 p-2">완료</button>
        <button className="w-full border border-purple-300 p-2">뒤로가기</button>
      </div>
    </form>
  );
};

export default Registration;
