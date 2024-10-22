import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Header } from "../_components/Header/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <html lang="en">
          <body>
            <Header />
            <main className="w-full mx-auto">{children}</main>
          </body>
        </html>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
