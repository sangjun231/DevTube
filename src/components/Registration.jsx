import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, userLogin, userRegist } from '../lib/supabase/userApi';
import useModalStore from '../zustand/modalStore';
import Modal from './Modal';
import useIsLoginStore from '../zustand/isLoginStore';

const Registration = () => {
  const { modal, toggle } = useModalStore((state) => state);
  const navigate = useNavigate();
  const [modalTask, setModalTask] = useState('');
  const { setIsLogin } = useIsLoginStore((state) => state);
  const email = useRef('');
  const nickname = useRef('');
  const password = useRef('');

  const emailRegex = new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');

  const completeRegist = async (e, email, nickname, password) => {
    e.preventDefault();

    if (!email.trim() || !nickname.trim() || !password.trim()) {
      toggle();
      setModalTask('회원가입 양식에 맞게 입력해 주세요');
      return;
    }

    if (!emailRegex.test(email)) {
      toggle();
      setModalTask('올바른 이메일 형식이 아닙니다');
      return;
    }

    if (!(nickname.length >= 4 && nickname.length <= 10)) {
      toggle();
      setModalTask('닉네임은 4자리 이상, 10자리 이하여야 합니다.');
      return;
    }

    if (!(password.length >= 6 && password.length <= 14)) {
      toggle();
      setModalTask('비밀번호는 6자리 이상, 14자리 이하여야 합니다.');
      return;
    }

    if (!confirm('회원가입을 완료하시겠습니까?')) return;

    const registRes = await userRegist({ email, password });

    if (registRes?.error) {
      toggle();
      setModalTask('회원가입이 완료되지 않았습니다. 다시 시도하세요');
      return;
    }

    const addUserRes = await addUser({
      id: registRes?.data.user.id,
      email,
      nickname
    });

    if (addUserRes.error) {
      toggle();
      setModalTask('회원가입 절차에 문제가 발생했습니다. 다시 시도하세요');
      return;
    }

    await userLogin({ email, password });
    setIsLogin(true);
    navigate('/survey');
    return;
  };

  return (
    <>
      {modal ? <Modal modalTask={modalTask} /> : null}
      <form className="flex min-w-96 flex-col items-center justify-center gap-12 bg-bgDev p-12">
        <h1 className="text-xl font-bold">회원가입</h1>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <div className="w-full">
            <label className="text-sm">
              이메일
              <input
                ref={email}
                className="mt-1 w-full border-b border-gray-400 bg-transparent p-2 outline-0"
                type="email"
                placeholder="example@example.com"
              />
            </label>
          </div>
          <div className="w-full">
            <label className="text-sm">
              닉네임
              <input
                ref={nickname}
                className="mt-1 w-full border-b border-gray-400 bg-transparent p-2 outline-0"
                type="text"
                placeholder="4자리 이상, 10자리 이하"
              />
            </label>
          </div>
          <div className="w-full">
            <label className="text-sm">
              비밀번호
              <input
                ref={password}
                className="mt-1 w-full border-b border-gray-400 bg-transparent p-2 outline-0"
                type="password"
                placeholder="6자리 이상, 14자리 이하"
              />
            </label>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <button
            type="submit"
            onClick={(e) => completeRegist(e, email.current.value, nickname.current.value, password.current.value)}
            className="w-full bg-yellow-200 p-2 text-sm font-bold hover:bg-yellow-300"
          >
            완료
          </button>
          <Link
            to="/login"
            className="w-full border border-yellow-200 p-2 text-center text-sm font-bold hover:bg-slate-50"
          >
            취소
          </Link>
        </div>
      </form>
    </>
  );
};

export default Registration;
