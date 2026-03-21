import { promises as fs } from "node:fs";
import path from "node:path";
import { blogPosts as staticPosts } from "@/lib/blog-posts";
import type { BlogPost } from "@/lib/content";

const generatedPostsPath = path.join(process.cwd(), "content", "generated-posts.json");

export type StoredBlogPost = BlogPost & {
  generated?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

async function ensureStore() {
  await fs.mkdir(path.dirname(generatedPostsPath), { recursive: true });

  try {
    await fs.access(generatedPostsPath);
  } catch {
    await fs.writeFile(generatedPostsPath, "[]", "utf8");
  }
}

export async function readGeneratedPosts(): Promise<StoredBlogPost[]> {
  await ensureStore();
  const raw = await fs.readFile(generatedPostsPath, "utf8");

  try {
    const parsed = JSON.parse(raw) as StoredBlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeGeneratedPosts(posts: StoredBlogPost[]) {
  await ensureStore();
  await fs.writeFile(generatedPostsPath, JSON.stringify(posts, null, 2), "utf8");
}

export async function upsertGeneratedPost(post: StoredBlogPost) {
  const posts = await readGeneratedPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);

  if (index >= 0) {
    posts[index] = {
      ...posts[index],
      ...post,
      updatedAt: new Date().toISOString()
    };
  } else {
    posts.unshift({
      ...post,
      generated: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  await writeGeneratedPosts(posts);
  return posts;
}

export async function getAllBlogPosts(): Promise<StoredBlogPost[]> {
  const generated = await readGeneratedPosts();
  const merged = [...generated, ...staticPosts];

  return merged.filter(
    (post, index, array) => array.findIndex((item) => item.slug === post.slug) === index
  );
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug);
}
