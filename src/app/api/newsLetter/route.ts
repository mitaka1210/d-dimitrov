import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json(); // Parse the body and get email
        console.log('Received email:', email);

        // ✅ Четем тялото на заявката

        // ✅ Изпращаме заявка към външния API
        const response = await fetch(`https://share.d-dimitrov.eu/api/newsletter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });

        const data = await response.json();

        // ✅ Връщаме отговора от външния API
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("🔴 Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}