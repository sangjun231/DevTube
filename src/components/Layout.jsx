const Layout = ({ children }) => {
  return (
    <div id="wrappingBody">
      <header>
        <h1>My Todo App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
