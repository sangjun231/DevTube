import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser, userRegist } from '../lib/supabase/userApi';
import useModalStore from '../zustand/modalStore';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';

const Registration = () => {
  const { modal, confirmModal, toggle, confirmToggle } = useModalStore((state) => state);
  const navigate = useNavigate();
  const [modalTask, setModalTask] = useState('');
  const email = useRef('');
  const nickname = useRef('');
  const password = useRef('');

  const emailRegex = new RegExp('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');

  const completeRegist = async (e, email, nickname, password) => {
    e.preventDefault();

    if (!email.trim() || !nickname.trim() || !password.trim()) {
      /* alert('회원가입 양식에 맞게 입력해 주세요'); */
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

    /* if (!confirm('회원가입을 완료하시겠습니까?')) return; */
    setModalTask('회원가입을 완료하시겠습니까?');
    const answer = await confirmToggle();
    if (!answer) {
      confirmToggle();
      return;
    }

    const registRes = await userRegist({ email, password });

    if (registRes?.error) {
      toggle();
      setModalTask('회원가입이 완료되지 않았습니다. 다시 시도하세요');
      return;
    }

    await addUser({
      id: registRes?.data.user.id,
      email,
      nickname
    });

    toggle();
    setModalTask('회원가입이 완료되었습니다.');

    navigate('/login');
  };

  return (
    <>
      {!modal ? <Modal modalTask={modalTask} /> : null}
      {!confirmModal ? <ConfirmModal modalTask={modalTask} /> : null}
      <form className="bg-bgDev flex w-1/3 flex-col items-center justify-center gap-12 p-12">
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
