import type { APIRoute } from 'astro';
import { getAllAnime, animeToApi } from '~/lib/anime';

export const prerender = true;

export async function getStaticPaths() {
  const all = await getAllAnime();
  return all.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: any };
  const data = animeToApi(entry);

  return new Response(
    JSON.stringify({ data }, null, 2),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
