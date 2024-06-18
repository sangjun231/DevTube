import React from 'react'
import logo from '../assets/Devtube_logo.png'

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-yellow-50 w-80 h-96 flex flex-col justify-center items-center"  > 
        <img className="w-24" src={logo} alt="로고" />
        <div className="flex flex-col justify-center items-center">
          <input className="w-56 m-3" placeholder="아이디" />
          <input className="w-56 m-3" placeholder="비밀번호" />
          <div className="m-2">
            <button className="m-2 border-solid border-slate-300" type="button">로그인</button>
            <button className="m-2" type="button">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
