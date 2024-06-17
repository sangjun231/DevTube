import React from 'react';

const Login = () => {
  return (
    <div className="bg-yellow-50">
      <h2>로그인</h2>
      <div className="bucket">
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
        <button type="button">로그인</button>
        <button type="button">회원가입</button>
      </div>
    </div>
  );
};

export default Login;
