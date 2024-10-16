import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "./_components/Header/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="max-w-7xl mx-auto">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
