import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div id="wrappingBody">
      <header>
        <h1>My Todo App</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
