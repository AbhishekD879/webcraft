import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/",]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  const url = request.nextUrl;
  const hostname = request.headers.get("host");

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    const baseDomain = process.env.BASE_DOMAIN;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    currentHost = hostname?.replace(`.localhost:3000`, "");
  }

  console.log("currenthost",currentHost)

  // If not currenthost then we might be acceing root
  if(!currentHost){
    console.log("No Subdomain")
    return NextResponse.next();
  }else{
    if (process.env.NODE_ENV === "development") {
        if (currentHost !== "localhost:3000" && currentHost !== "www") {
          // Rewrite the URL to the [domain] route with the subdomain as the parameter
          const pathWithDomain = url.pathname === "/" 
            ? `/${currentHost}` 
            : `/${currentHost}${url.pathname}`;
            
          console.log(`Rewriting to: ${pathWithDomain}`);
          return NextResponse.rewrite(new URL(pathWithDomain, request.url));
        }
      }else{
        if (currentHost!== "www") {
          // Rewrite the URL to the [domain] route with the subdomain as the parameter
          const pathWithDomain = url.pathname === "/" 
            ? `/${currentHost}` 
            : `/${currentHost}${url.pathname}`;
            
          console.log(`Rewriting to: ${pathWithDomain}`);
          return NextResponse.rewrite(new URL(pathWithDomain, request.url));
        }
      }
  }


});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
