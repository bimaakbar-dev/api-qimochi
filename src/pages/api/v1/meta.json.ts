import type { APIRoute } from 'astro';
import { getAllAnime } from '~/lib/anime';

export const prerender = true;

export const GET: APIRoute = async () => {
  const all = await getAllAnime();

  return new Response(
    JSON.stringify(
      {
        name: 'Qimochi API',
        version: 'v1',
        total_anime: all.length,
        generated_at: new Date().toISOString(),
        endpoints: {
          anime_index: '/api/v1/anime.json',
          anime_detail: '/api/v1/anime/{slug}.json',
          meta: '/api/v1/meta.json',
        },
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
