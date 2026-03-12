import {NextRequest, NextResponse} from 'next/server';
import pool from "../../../database/db";


// Тип за секциите
type Section = {
    id: number;
    article_id: number;
    position: number;
    title: string;
    content: string;
    created_at: string;
    image_url: string;
};

export async function GET(req: NextRequest, res: any) {
    // Извличане на id от query параметрите
    const id = req.nextUrl.searchParams.get('id');
    // Проверка дали id е налично
    if (!id) {
        return NextResponse.json({error: 'ID parameter is missing'}, {status: 400});
    }

    try {
        // Заявка към базата данни за секцията със съответното id
        const result = await pool.query('SELECT * FROM sections WHERE article_id = $1', [id]);// Ако няма намерени редове
        if (result.rows.length === 0) {
            return NextResponse.json({error: 'Section not found'}, {status: 404});
        }

        // Вземане на резултата
        const section: Section[] = result.rows;

        // Връщане на отговор със секцията
        return NextResponse.json(section);
    } catch (error) {
        console.error('Error fetching data:', error);
        // @ts-ignore
        return NextResponse.json({error: 'Failed to fetch data', errorMsg: error.message}, {status: 500});
    }
}


