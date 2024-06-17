import React from 'react';

const Registration = () => {
  return (
    <form className="flex w-1/3 flex-col items-center justify-center gap-12 border border-gray-400 p-12">
      <h1 className="text-xl font-bold">회원가입</h1>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="w-full">
          <label className="text-sm">
            이메일
            <input
              className="mt-1 w-full border-b border-gray-400 p-2 outline-0"
              type="email"
              placeholder="example@example.com"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="text-sm">
            닉네임
            <input
              className="mt-1 w-full border-b border-gray-400 p-2 outline-0"
              type="text"
              placeholder="4자리 이상, 10자리 이하"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="text-sm">
            비밀번호
            <input
              className="mt-1 w-full border-b border-gray-400 p-2 outline-0"
              type="password"
              placeholder="6자리 이상, 14자리 이하"
            />
          </label>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <button className="w-full bg-purple-300 p-2 text-sm font-bold hover:bg-purple-400">완료</button>
        <button className="w-full border border-purple-300 p-2 text-sm font-bold hover:bg-gray-200">취소</button>
      </div>
    </form>
  );
};

export default Registration;
