import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, markdownToBlocks } from "../../../lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="article-shell">
      <a className="back-link" href="/">
        Volver al índice
      </a>

      <article className="article">
        <header className="article-header">
          <div className="post-meta">
            <span>{post.category}</span>
            <time dateTime={post.date}>{post.displayDate}</time>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        <div className="article-body">
          {markdownToBlocks(post.content).map((block, index) => {
            if (block.type === "heading") {
              return <h2 key={index}>{block.text}</h2>;
            }

            return <p key={index}>{block.text}</p>;
          })}
        </div>
      </article>
    </main>
  );
}
