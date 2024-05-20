import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { clerkMiddleware } from '@clerk/nextjs/server';

export function middleware(request: NextRequest) {
    const cookies = request.cookies;

    if (cookies.get(process.env.XRAI_TOKEN as string)) {
        return NextResponse.next();
    }

    return NextResponse.next({
        headers: {
            'Set-Cookie': `${process.env.XRAI_TOKEN}=${uuidv4()}`
        }
    });
}


export default clerkMiddleware();

export const config = {
    matcher: ['/((?!.*..*|_next).*)', '/', '/(api|trpc)(.*)']
};
