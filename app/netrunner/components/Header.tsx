export default function Header() {
  return (
    <header className="header">
      <h1 data-text="NETRUNNER">NETRUNNER</h1>
      <div className="status-panel">
        <p>
          SYS.STATUS:{" "}
          <span style={{ color: "var(--neon-yellow)" }}>ONLINE</span>
        </p>
        <p>LATENCY: 12ms</p>
        <p>ENCRYPTION: AES-4096</p>
      </div>
    </header>
  );
}
