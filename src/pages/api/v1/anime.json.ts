import type { APIRoute } from 'astro';
import { getAllAnime, animeToApi } from '~/lib/anime';

export const prerender = true;

export const GET: APIRoute = async () => {
  const all = await getAllAnime();

  const data = all
    .map(animeToApi)
    .sort((a, b) => {
      const ta = a.year ?? 0;
      const tb = b.year ?? 0;
      if (ta !== tb) return tb - ta;
      return a.title.localeCompare(b.title);
    });

  return new Response(
    JSON.stringify(
      {
        data,
        total: data.length,
        generated_at: new Date().toISOString(),
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
