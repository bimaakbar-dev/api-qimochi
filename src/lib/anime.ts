import { getCollection, type CollectionEntry } from 'astro:content';

export type AnimeEntry = CollectionEntry<'anime'>;

export async function getAllAnime(): Promise<AnimeEntry[]> {
  return getCollection('anime', ({ data }) => !data.draft);
}

export async function getAnimeById(id: string): Promise<AnimeEntry | null> {
  const all = await getAllAnime();
  return all.find((a) => a.id === id) ?? null;
}

export function animeToApi(entry: AnimeEntry) {
  const d = entry.data;
  return {
    id: entry.id,
    title: d.title,
    titleEnglish: d.titleEnglish ?? null,
    titleNative: d.titleNative ?? null,
    image: d.image ?? null,
    banner: d.banner ?? null,
    type: d.type,
    status: d.status,
    source: d.source ?? null,
    season: d.season ?? null,
    year: d.year ?? d.aired?.from?.getFullYear() ?? null,
    episodes: d.episodes ?? null,
    duration: d.duration ?? null,
    rating: d.rating ?? null,
    genres: d.genres ?? [],
    studios: d.studios ?? [],
    score: d.stats?.score ?? null,
    trailer: d.trailer ?? null,
  };
}
