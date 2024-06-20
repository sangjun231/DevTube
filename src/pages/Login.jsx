import { useRef, useState } from 'react';
import logo from '../assets/Devtube_logo.png';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../lib/supabase/userApi';
import useModalStore from '../zustand/modalStore';
import Modal from '../components/Modal';
import useIsLoginStore from '../zustand/isLoginStore';

export default function Login() {
  const navigate = useNavigate();

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [modalTask, setModalTask] = useState('');
  const { setIsLogin } = useIsLoginStore((state) => state);
  const { modal, toggle } = useModalStore((state) => state);

  const handleLogInClick = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      toggle();
      setModalTask('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    if (!(passwordRef.current.value.length >= 6 && passwordRef.current.value.length <= 14)) {
      toggle();
      setModalTask('비밀번호는 6자리 이상, 14자리 이하여야 합니다.');
      return;
    }

    const { data, error } = await userLogin({ email: emailRef.current.value, password: passwordRef.current.value });
    if (error) {
      toggle();
      setModalTask(`로그인 실패. 유저 정보를 불러오지 못했습니다. \n 아이디 또는 비밀번호를 확인해주세요.`);
      return;
    }

    if (data) {
      setIsLogin(true);
      navigate('/');
      return;
    }
  };

  const handleSignUpClick = () => {
    navigate('/auth');
  };

  return (
    <>
      {modal ? <Modal modalTask={modalTask} /> : null}
      <div className="flex h-screen items-center justify-center">
        <div className="flex min-w-96 flex-col items-center justify-center gap-12 bg-bgDev p-12">
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <img className="w-24" src={logo} alt="로고" />
            <div className="flex w-full flex-col items-center justify-center gap-5">
              <div className="w-full">
                <label className="text-sm">
                  이메일
                  <input
                    className="mt-1 w-full border-b border-gray-400 bg-transparent p-2 outline-0"
                    ref={emailRef}
                    type="text"
                    placeholder="example@example.com"
                  />
                </label>
              </div>
              <div className="w-full">
                <label className="text-sm">
                  비밀번호
                  <input
                    className="mt-1 w-full border-b border-gray-400 bg-transparent p-2 outline-0"
                    ref={passwordRef}
                    type="password"
                    placeholder="6자리 이상, 14자리 이하"
                  />
                </label>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <button
                className="w-full bg-yellow-200 p-2 text-sm font-bold hover:bg-yellow-300"
                type="button"
                onClick={handleLogInClick}
              >
                로그인
              </button>
              <button
                className="w-full border border-yellow-200 p-2 text-center text-sm font-bold hover:bg-slate-50"
                type="button"
                onClick={handleSignUpClick}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
