import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { refresh_token } = body;

        console.log('=== REFRESH TOKEN API DEBUG ===');
        console.log('Refresh token provided:', refresh_token ? 'Yes' : 'No');

        const response = await fetch('https://car-nextjs-api.cheatdev.online/refresh', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token })
        });

        console.log('External API response status:', response.status);
        console.log('External API response ok:', response.ok);

        const data = await response.json();
        console.log('External API response data:', data);

        if (!response.ok) {
            console.error('Token refresh failed:', data);
            return NextResponse.json(
                {
                    message: data.message || "Failed to refresh token",
                    error: data.error || "Token refresh failed"
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: "Token refreshed successfully",
            access_token: data.access_token,
            refresh_token: data.refresh_token || refresh_token
        });

    } catch (error) {
        console.error('Refresh token API error:', error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error
            },
            { status: 500 }
        );
    }
}