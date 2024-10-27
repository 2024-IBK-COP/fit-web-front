export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        '/((?!api|img|_next/static|_next/image|_next/img|favicon.ico|login).*)',
    ] 
}