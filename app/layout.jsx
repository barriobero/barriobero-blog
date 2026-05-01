import "./globals.css";

export const metadata = {
  title: {
    default: "barriobero",
    template: "%s | barriobero"
  },
  description: "Blog personal de Jorge Barriobero: ensayos, lecturas, viajes y trabajo creativo.",
  metadataBase: new URL("https://barriobero.es")
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header" aria-label="Cabecera">
          <a className="brand" href="/" aria-label="Ir al inicio">
            barriobero
          </a>
        </header>

        {children}

        <footer className="site-footer">
          <p>© 2026 barriobero</p>
          <div>
            <a href="/admin/">Admin</a>
            <a href="#">RSS</a>
            <a href="#">Email</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
