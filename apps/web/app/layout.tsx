import "./globals.css";

export const metadata = {
  title: "AppPsicologa — Web",
  description: "Frontend (Next.js) del proyecto AppPsicologa"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
