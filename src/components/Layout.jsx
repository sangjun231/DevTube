import { Link, Outlet } from 'react-router-dom';

function Navbar({ children }) {
  return (
    <nav className="fixed top-0 z-10 mx-auto flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-white">
      {children}
    </nav>
  );
}

function NavItem({ to, children }) {
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
          <NavItem to="/login">로그인</NavItem>
        </div>
      </Navbar>
      <div className="px-8 py-24">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
