import { Link, Outlet } from 'react-router-dom';

function Navbar({ children }) {
  return (
    <nav className="z-1000 fixed left-0 right-0 top-0 mx-auto flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-white">
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
    <div className="z-1000 fixed bottom-0 left-0 right-0 mx-auto flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-white">
      {children}
    </div>
  );
}

function FooterItem({ to, children }) {
  return (
    <Link to={to} className="mx-2 text-white no-underline hover:underline">
      {children}
    </Link>
  );
}

const Layout = () => {
  return (
    <>
      <Navbar>
        <NavItem to="/">HOME</NavItem>
        <div className="align-center flex">
          <NavItem to="/profile">마이페이지</NavItem>
          <NavItem to="/login">로그아웃</NavItem>
        </div>
      </Navbar>

      <div className="px-8 py-24">
        <Outlet />
      </div>

      <Footer>
        <FooterItem to="#">푸터푸터</FooterItem>
      </Footer>
    </>
  );
};

export default Layout;
