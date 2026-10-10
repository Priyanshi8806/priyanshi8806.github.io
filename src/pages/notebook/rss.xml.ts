import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotebook } from '../../lib/content';
import { site } from '../../config';
import { url } from '../../lib/url';

export async function GET(context: APIContext) {
  const entries = await getNotebook();
  return rss({
    title: `${site.name}: Lab notebook`,
    description: 'Short, dated notes on research in progress.',
    site: context.site!,
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.summary,
      link: url(`/notebook/${e.id}/`),
    })),
  });
}
