import rss from "@astrojs/rss";
import { site } from "../config/site";
import { getPublishedWriting } from "../lib/content";

export async function GET(context: { site?: URL }) {
  const entries = await getPublishedWriting();

  return rss({
    title: site.rss.title,
    description: site.rss.description,
    site: context.site ?? site.siteUrl,
    items: entries.map(({ id, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.publishedAt,
      link: `/writing/${id}/`,
      guid: new URL(`/writing/${id}/`, context.site ?? site.siteUrl).toString(),
    })),
  });
}
