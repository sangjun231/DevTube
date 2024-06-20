import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase/supabase';

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
  const [session, setSession] = useState(null);
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setNickname(null);
      }
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setNickname(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  const fetchUserProfile = async (id) => {
    const { data, error } = await supabase.from('users').select('nickname').eq('id', id).single();

    if (error) {
      console.error('닉네임 정보를 받아올 수 없습니다', error);
    } else {
      setNickname(data.nickname);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!confirm('로그아웃 하시겠습니까?')) return;
    if (error) console.error('로그아웃에 실패하였습니다', error);
    else {
      alert('로그아웃 되었습니다.');
      navigate('/login');
    }
  };

  // useEffect(() => {
  //   if (nickname) console.log(nickname);
  // }, [nickname]);
  return (
    <>
      <NavBar>
        <NavItem to="/">
          <img className="size-14" src="img/12logo.png" alt="logo_image" />
        </NavItem>
        <div className="align-center flex">
          <Link to="/survey" className="mr-3">
            💡 맞춤 추천
          </Link>
          <NavItem to="/profile">마이페이지</NavItem>
          {session ? (
            <span className="mx-2 flex items-center text-white">
              {nickname ? `${nickname}님 반갑습니다` : 'Loading...'}
              <button onClick={handleLogout} className="mx-2 border text-white no-underline hover:underline">
                로그아웃
              </button>
            </span>
          ) : (
            <NavItem to="/login">로그인</NavItem>
          )}
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
