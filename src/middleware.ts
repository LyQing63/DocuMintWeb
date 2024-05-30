import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const whiteList = ["/login", "/403", "/404", "/500", "/register"];
    const isWhite = whiteList.includes(pathname);
    if (isWhite) {
        return NextResponse.next();
    } else {
        // const token = request.cookies.get("token" as any)?.value;
        // // const userInfo = request.cookies.get("userInfo" as any)?.value;
        // // console.log('--🚀🚀🚀🚀🚀------middleware.ts---注释所在行数37----😊===》', token)
        // // if (userInfo) {
        // //   console.log('--🚀🚀🚀🚀🚀--middleware.ts---注释所在行数25----😊===》', JSON.parse(userInfo as any));
        // // }
        // // if(true){
        // //   await test(token);
        // // }
        // if (!token) {
        //     return NextResponse.redirect(new URL("/login", request.url));
        // } else {
        //     return NextResponse.next();
        // }
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matches: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
