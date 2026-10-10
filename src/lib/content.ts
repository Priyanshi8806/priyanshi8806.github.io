import { getCollection } from 'astro:content';

// Drafts show up in `npm run dev` but are left out of the built site.
const visible = (e: { data: { draft?: boolean } }) => import.meta.env.DEV || !e.data.draft;
const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const getProjects = async () => (await getCollection('projects', visible)).sort(newestFirst);
export const getNotebook = async () => (await getCollection('notebook', visible)).sort(newestFirst);
export const getExplainers = async () => (await getCollection('explainers', visible)).sort(newestFirst);
export const getPhotos = async () => (await getCollection('photos', visible)).sort(newestFirst);
export const getAgenda = async () =>
  (await getCollection('agenda')).sort((a, b) => a.data.order - b.data.order);
