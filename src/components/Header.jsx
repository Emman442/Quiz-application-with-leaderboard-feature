function Header() {
  return (
    <header className="app-header">
      <img
        src="https://media.dscvr.one/fetch?fit=scale-down&height=148&media=https%3A%2F%2Fipfs.dscvr.one%2Fb2801e07-5fcb-486b-8149-9ee1b66f840b-bucket%2Fl5u7qro5crij96sxkkn.jpeg&width=148"
        style={{
          borderRadius: "7px",
          width: "120",
          height: "120px"
        }}
        alt="React logo"
      />
      <h1>The DSCVR Quiz</h1>
    </header>
  );
}

export default Header;
