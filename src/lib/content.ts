import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config/site";

type CollectionName = "works" | "writing" | "experiments" | "projects" | "collectionsArchive";
type PublicEntry<C extends CollectionName> = CollectionEntry<C>;

function compareEntries<C extends CollectionName>(a: PublicEntry<C>, b: PublicEntry<C>) {
  const dateDifference = b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  return dateDifference || a.id.localeCompare(b.id, "en");
}

async function getPublished<C extends CollectionName>(collection: C) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort(compareEntries);
}

export const getPublishedWorks = () => getPublished("works");
export const getPublishedWriting = () => getPublished("writing");
export const getPublishedExperiments = () => getPublished("experiments");
export const getPublishedProjects = () => getPublished("projects");
export const getPublishedCollections = () => getPublished("collectionsArchive");

export function selectFeatured<T extends { data: { featured: boolean } }>(entries: T[], limit = 3): T[] {
  return [...entries.filter(({ data }) => data.featured), ...entries.filter(({ data }) => !data.featured)].slice(0, limit);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function toDateTime(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function canonicalFor(pathname: string) {
  return site.siteUrl ? new URL(pathname, site.siteUrl) : undefined;
}
