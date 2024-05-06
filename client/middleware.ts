import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

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

// export const config = {
//     matcher: ['/chat', '/']
// };
