import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password, confirm_password } = body;

        console.log('=== SIGNUP API DEBUG ===');
        console.log('Request body:', { username, email, password: password ? '***' : 'missing' });

        const response = await fetch('https://car-nextjs-api.cheatdev.online/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, confirm_password })
        });

        console.log('External API response status:', response.status);
        console.log('External API response ok:', response.ok);

        const data = await response.json();
        console.log('External API response data:', data);

        if (!response.ok) {
            console.error('Signup failed:', data);
            return NextResponse.json(
                {
                    message: data.message || "Failed to register",
                    error: data.error || "Registration failed"
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: "Registration successful",
            user: data.user || null
        });

    } catch (error) {
        console.error('Signup API error:', error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error
            },
            { status: 500 }
        );
    }
}
