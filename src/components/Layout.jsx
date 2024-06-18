import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

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
    console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div id="scroll__container" className="z-20 mr-6 size-24 scale-75">
        <button id="top" onClick={scrollToTop} type="button">
          <img className="h-20 w-20" src="img/topbutton.png" alt="topbutton_img" />
        </button>
      </div>
    )
  );
}

const githubUrl = 'https://github.com/sangjun231/DevTube';

function Navbar({ children }) {
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
    <div className="bg-customGray fixed bottom-0 left-0 right-0 z-10 mx-auto flex w-full justify-between px-4 py-2 text-white">
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
  return (
    <>
      <Navbar>
        <NavItem to="/">
          <img className="size-14" src="img/12logo.png" alt="logo_image" />
        </NavItem>
        <div className="align-center flex">
          <NavItem to="/profile">마이페이지</NavItem>
          <NavItem to="/login">로그인</NavItem>
        </div>
      </Navbar>

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
