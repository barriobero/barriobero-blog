import fs from "node:fs";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content/posts");
export const ARCHIVE_PAGE_SIZE = 2;

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => getPostBySlug(fileName.replace(/\.md$/, "")))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getHomePosts() {
  const posts = getAllPosts();
  const [leadPost, ...secondaryPosts] = posts;
  const archivePosts = secondaryPosts.slice(3);

  return {
    leadPost,
    secondaryPosts: secondaryPosts.slice(0, 3),
    archivePosts: getArchivePagePosts(archivePosts, 1),
    archivePageCount: getArchivePageCount(archivePosts)
  };
}

export function getArchivePosts() {
  return getAllPosts().slice(4);
}

export function getArchivePagePosts(posts = getArchivePosts(), page = 1) {
  const start = (page - 1) * ARCHIVE_PAGE_SIZE;
  return posts.slice(start, start + ARCHIVE_PAGE_SIZE);
}

export function getArchivePageCount(posts = getArchivePosts()) {
  return Math.max(1, Math.ceil(posts.length / ARCHIVE_PAGE_SIZE));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-01-01",
    category: data.category || "Notas",
    excerpt: data.excerpt || "",
    readingTime: data.readingTime || "5 min",
    displayDate: formatDate(data.date),
    shortDate: formatShortDate(data.date),
    content
  };
}

export function markdownToBlocks(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "heading", text: block.replace(/^##\s+/, "") };
      }

      return { type: "paragraph", text: block };
    });
}

function parseFrontmatter(fileContents) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: fileContents };
  }

  const data = {};

  match[1].split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = value;
  });

  return { data, content: match[2].trim() };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short"
  }).format(new Date(date));
}
