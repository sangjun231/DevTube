import { Link } from 'react-router-dom';
import logo from '../assets/Devtube_logo.png';

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-96 w-80 flex-col items-center justify-center bg-yellow-50">
        <img className="w-24" src={logo} alt="로고" />
        <div className="flex flex-col items-center justify-center">
          <input className="m-3 w-56" placeholder="아이디" />
          <input className="m-3 w-56" placeholder="비밀번호" />
          <div className="m-2">
            <button className="m-2 border-solid border-slate-300" type="button">
              로그인
            </button>
            <Link to="/auth" className="m-2 no-underline hover:underline" type="button">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
