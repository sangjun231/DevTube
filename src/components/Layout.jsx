import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase/supabase';
import { getAuthSession, getAuthUser, selectEqUser, userLogout } from '../lib/supabase/userApi';
import { useQuery } from '@tanstack/react-query';
import useIsLoginStore from '../zustand/isLoginStore';
import useIdStore from '../zustand/idStore';

function TopButton() {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div
        id="scroll__container"
        className="fixed bottom-16 right-8 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-white"
      >
        <button id="top" onClick={scrollToTop} type="button">
          <img className="h-20 w-20" src="img/topbutton.png" alt="topbutton_img" />
        </button>
      </div>
    )
  );
}

const githubUrl = 'https://github.com/sangjun231/DevTube';

function NavBar({ children }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 mx-auto flex w-full items-center justify-between bg-gray-950 px-4 py-2 text-white">
      {children}
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <Link to={to} className="left-0 right-0 top-0 mx-2 text-white no-underline hover:underline">
      {children}
    </Link>
  );
}

function NavSurveyItem({ to, children }) {
  const location = useLocation();

  // 현재 경로가 "/survey"가 아닌 경우에만 활성화
  const isActive = location.pathname !== '/survey';

  return isActive ? (
    <Link to={to} className="left-0 right-0 top-0 mx-2 text-white no-underline hover:underline">
      {children}
    </Link>
  ) : (
    <></>
  );
}

function Footer({ children }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex w-full justify-between bg-customGray px-4 py-2 text-white">
      {children}
    </div>
  );
}

function FooterItem({ to, children }) {
  return (
    <Link to={to} className="mx-2 flex items-center justify-between text-white no-underline hover:underline">
      {children}
    </Link>
  );
}

const Layout = () => {
  const { setId } = useIdStore((state) => state);
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();
  const { setIsLogin } = useIsLoginStore((state) => state);

  const showNickname = async () => {
    const { data } = await getAuthSession();
    if (!data.session) {
      setIsLogin(false);
      await userLogout();
      navigate('/login');
      return;
    }
    if (authUser) {
      const { data, error } = await selectEqUser(authUser?.id);
      if (error) {
        setIsLogin(false);
        await userLogout();
        navigate('/login');
        return;
      } else if (data.selection === null) {
        navigate('/survey');
      }
      setId(authUser.id);
      setNickname(data.nickname);
      return;
    }
  };

  const { data: authUser, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser
  });

  if (isError) {
    setIsLogin(false);
    userLogout();
    navigate('/login');
    return;
  }

  useEffect(() => {
    showNickname();
  }, [authUser]);

  const handleLogout = async () => {
    setIsLogin(false);
    await userLogout();
    navigate('/login');
    return;
  };

  return (
    <>
      <NavBar>
        <NavItem to='/'>
          <img className="size-14" src="img/12logo.png" alt="logo_image" />
        </NavItem>
        <div className="align-center flex">
          <span className="mx-2 flex items-center text-white">
            {nickname ? `${nickname}님 반갑습니다` : 'Loading...'}
          </span>
          <Link to="/survey" className="mr-3">
            💡 맞춤 추천
          </Link>
          <NavItem to="/profile">마이페이지</NavItem>
          <button
            onClick={handleLogout}
            className="mx-3 rounded-md border bg-gray-100 px-3 text-black no-underline hover:underline"
          >
            로그아웃
          </button>
        </div>
      </NavBar>
      <div className="px-8 py-24">
        <Outlet />
      </div>
      <div className="grid justify-items-end">
        <TopButton />
      </div>
      <Footer>
        <FooterItem to="#">
          <img onClick={() => window.open(githubUrl)} className="size-8" src="img/github-logo.png" alt="github-logo" />

          <p onClick={() => window.open(githubUrl)} className="ml-4 flex items-center">
            @2024 all rights reserved DevTube
          </p>
        </FooterItem>
      </Footer>
    </>
  );
};

export default Layout;
