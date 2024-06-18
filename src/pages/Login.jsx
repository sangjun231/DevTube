import { useState } from 'react';
import logo from '../assets/Devtube_logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogInClick = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw error;
      localStorage.setItem('accessToken', data.session.access_token);
    } catch (error) {
      console.log('error');
    }
  };

  const handleSignUpClick = () => {
    navigate('/auth');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-bgDev flex h-96 w-1/4 flex-col items-center justify-center rounded-lg">
        <img className="w-24" src={logo} alt="로고" />
        <div className="mt-4 flex flex-col items-center justify-center">
          <input className="m-3 h-8 w-56" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="아이디" />
          <input
            className="m-3 h-8 w-56"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <div className="m-4">
            <button
              className="m-4 h-8 w-20 rounded-md border-0 bg-yellow-200 text-slate-500 hover:underline"
              type="button"
              onClick={handleLogInClick}
            >
              로그인
            </button>
            <button
              className="m-4 h-8 w-20 rounded-md border-0 bg-yellow-400 text-slate-500 no-underline hover:underline"
              type="button"
              onClick={handleSignUpClick}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
