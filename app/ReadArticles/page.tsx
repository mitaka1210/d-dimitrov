import { headers } from 'next/headers';
import pool from '../../database/db';
import './read.scss';
import ReadArticlesContent from './ReadArticlesContent';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const defaultMeta = {
    title: 'Статия - Dimitar Dimitrov',
    description: 'Прочети статия за аквариуми',
    openGraph: {
      title: 'Статия - Dimitar Dimitrov',
      description: 'Прочети статия за аквариуми',
      type: 'article' as const,
      siteName: 'Dimitar Dimitrov',
    },
  };

  if (!id) return defaultMeta;

  try {
    const result = await pool.query(
      `SELECT a.title, s.section_image_url
       FROM articles a
       LEFT JOIN sections s ON a.id = s.article_id
       WHERE a.id = $1
       ORDER BY s.position
       LIMIT 1`,
      [id]
    );

    const article = result.rows[0];
    if (!article) return defaultMeta;

    const headersList = await headers();
    const host = headersList.get('host') ?? 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;
    const pageUrl = `${baseUrl}/ReadArticles?id=${id}`;

    const imageUrl = article.section_image_url
      ? `${baseUrl}/api/upload/${article.section_image_url.replace('/upload/', '')}`
      : `${baseUrl}/images/start-aqua.jpg`;

    return {
      title: article.title,
      description: `Статия: ${article.title}`,
      openGraph: {
        title: article.title,
        description: `Статия: ${article.title}`,
        url: pageUrl,
        images: [{ url: imageUrl, width: 1200, height: 630 }],
        type: 'article',
        siteName: 'Dimitar Dimitrov',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: `Статия: ${article.title}`,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error('[generateMetadata] DB error:', err);
    return defaultMeta;
  }
}

export default function Page() {
  return <ReadArticlesContent />;
}
