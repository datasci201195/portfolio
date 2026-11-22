import { stat } from 'node:fs/promises';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function selectedWork() {
  return (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
}
export async function writingArticle(entry: CollectionEntry<'writing'>) {
  const { Content, remarkPluginFrontmatter } = await render(entry);
  const { data, id } = entry;
  const datePrefix = id.match(/^(\d{4}-\d{2}-\d{2})-(?=.)/);
  const filename = id.slice(datePrefix?.[0].length ?? 0).replace(/[-_]+/g, ' ');
  const title = data.title || remarkPluginFrontmatter.headingTitle || filename.charAt(0).toUpperCase() + filename.slice(1);
  const fileDate = datePrefix ? new Date(datePrefix[1] + 'T00:00:00Z') : undefined;
  const date = data.date ?? (fileDate && !Number.isNaN(fileDate.valueOf()) ? fileDate : undefined);
  return { id, title: String(title), summary: String(data.summary || remarkPluginFrontmatter.excerpt || ''), topic: data.topic, date, Content };
}

export async function latestWriting() {
  const entries = await getCollection('writing');
  const articles = await Promise.all(entries.map(async entry => {
    const { id, title, summary, topic, date } = await writingArticle(entry);
    const sortTime = date?.valueOf() ?? (entry.filePath ? (await stat(entry.filePath)).mtimeMs : 0);
    return { id, title, summary, topic, date, sortTime };
  }));
  return articles.sort((a, b) => b.sortTime - a.sortTime || a.id.localeCompare(b.id));
}
export function dateLabel(date: Date) {
  return date.toLocaleDateString('en-CA', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
