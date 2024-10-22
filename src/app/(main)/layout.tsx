import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Header } from "../_components/Header/Header";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* @ts-ignore */}
          {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}> */}
          <Header />
          <main className="w-full mx-auto">{children}</main>
          {/* </NextSSRPlugin> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
