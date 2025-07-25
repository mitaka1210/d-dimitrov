// src/utils/dbHandler.ts
import { NextResponse } from 'next/server';

type DbHandler = {
    devQuery: () => Promise<any>;
    prodUrl: string;
}

export async function handleDbRequest({ devQuery, prodUrl }: DbHandler) {
    try {
        let data;

        if (process.env.NODE_ENV === 'development') {
            const result = await devQuery();
            data = result.rows;
        } else {
            const response = await fetch(prodUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${prodUrl}`);
            }
            data = await response.json();
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Database request error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}