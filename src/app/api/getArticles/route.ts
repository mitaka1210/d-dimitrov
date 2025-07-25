/*
import { NextResponse } from 'next/server';
import pool from '@/database/db';

export async function GET() {
 try {
  let articles;

  if (process.env.NODE_ENV === 'development') {
   // Use local database in development
   const result = await pool.query('SELECT * FROM articles');
   articles = result.rows;
  } else {
   // Use production endpoint in production
   const response = await fetch('https://share.d-dimitrov.eu/api/articles');
   if (!response.ok) {
    throw new Error('Failed to fetch articles');
   }
   articles = await response.json();
  }

  return NextResponse.json(articles);
 } catch (error) {
  console.log('Error fetching articles:', error);
  return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
 }
}*/
// src/app/api/articles/route.ts
import { handleDbRequest } from '../HelperFunctionForProdAndDevDB/dbHandler';
import pool from '@/database/db';

export async function GET() {
 return handleDbRequest({
  devQuery: () => pool.query('SELECT * FROM articles'),
  prodUrl: 'https://share.d-dimitrov.eu/api/articles'
 });
}