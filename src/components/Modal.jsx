import React, { useRef } from 'react';
import useModalStore from '../zustand/modalStore';

const Modal = ({ modalTask }) => {
  const { toggle } = useModalStore((state) => state);
  const wrap = useRef();

  const areaToggle = (e) => {
    e.target.id === 'wrap' && toggle();
  };
  /* 모달 외부를 클릭시 창이 닫힌다. */

  const toggleFor = () => {
    toggle();
  };

  return (
    <>
      <div
        onClick={(e) => areaToggle(e)}
        id="wrap"
        ref={wrap}
        className="fixed left-0 top-0 z-30 flex h-dvh w-full items-center justify-center bg-gray-900/30"
      >
        <div className="flex w-96 flex-col items-center justify-center gap-7 bg-bgDev p-5">
          <h1 className="w-full text-left text-xl font-bold">알림</h1>
          <p className="w-full text-sm" style={{ whiteSpace: 'pre-line' }}>
            {modalTask}
          </p>
          <div className="flex w-full justify-end gap-3 text-sm">
            <button id="yes" onClick={() => toggleFor()} className="w-1/4 bg-yellow-300 p-2 hover:bg-yellow-400">
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
