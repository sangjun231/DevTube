import React, { useRef } from 'react';
import useModalStore from '../zustand/modalStore';

const Modal = ({ modalTask }) => {
  const { modal, toggle } = useModalStore((state) => state);
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
      {!modal && (
        <div
          onClick={(e) => areaToggle(e)}
          id="wrap"
          ref={wrap}
          className="fixed flex h-full w-full items-center justify-center bg-gray-900/30"
        >
          <div className="bg-bgDev flex w-96 flex-col items-center justify-center gap-7 p-5">
            <h1 className="w-full text-left text-xl font-bold">알림</h1>
            <p className="w-full text-sm">{modalTask}</p>
            <div className="flex w-full justify-end gap-3 text-sm">
              <button id="yes" onClick={() => toggleFor()} className="w-1/4 bg-yellow-300 p-2 hover:bg-yellow-400">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
