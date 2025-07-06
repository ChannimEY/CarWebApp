import {  NextResponse } from "next/server";

export async function POST() {
    try {
        console.log('=== LOGOUT API DEBUG ===');

        // Clear cookies by setting them to expire in the past
        const response = NextResponse.json({
            message: "Logged out successfully"
        });

        // Clear authentication cookies
        response.cookies.set('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });

        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });

        return response;

    } catch (error) {
        console.error('Logout API error:', error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error
            },
            { status: 500 }
        );
    }
}
