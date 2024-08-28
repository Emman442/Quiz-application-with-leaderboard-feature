function Header() {
  return (
    <header className="app-header">
      <img
        src="/Solana.svg"
        style={{
          borderRadius: "7px",
          width: "110",
          height: "110",
        }}
        alt="React logo"
      />
      <h1>The SOLANA Quiz</h1>
    </header>
  );
}

export default Header;
