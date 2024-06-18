import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <div className="w-1/3 flex-col bg-slate-500 p-8">
      <form>
        <div className="flex-col items-center justify-center gap-5">
          <div>
            <label>
              이메일
              <input type="email" />
            </label>
          </div>
          <div>
            <label>
              닉네임
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              비밀번호
              <input type="password" />
            </label>
          </div>
        </div>
        <div className="flex justify-evenly bg-red-400">
          <button className="w-5/12 bg-amber-600 p-2">완료</button>
          <Link to="/login" className="w-5/12 bg-amber-600 p-2 no-underline hover:underline">
            뒤로가기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
