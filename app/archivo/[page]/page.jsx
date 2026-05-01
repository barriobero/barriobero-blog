import { notFound } from "next/navigation";
import { ArchiveList, Pagination } from "../../ui";
import { getArchivePageCount, getArchivePagePosts } from "../../../lib/posts";

export function generateStaticParams() {
  const pageCount = getArchivePageCount();

  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;

  return {
    title: `Archivo · Página ${page}`,
    description: "Archivo de artículos antiguos de barriobero."
  };
}

export default async function ArchivePage({ params }) {
  const { page } = await params;
  const currentPage = Number(page);
  const pageCount = getArchivePageCount();

  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > pageCount) {
    notFound();
  }

  const posts = getArchivePagePosts(undefined, currentPage);

  return (
    <main className="page-shell">
      <section className="archive archive-page" aria-labelledby="archivo-title">
        <div className="archive-heading">
          <a className="back-link" href="/#archivo">Volver al índice</a>
          <p className="eyebrow">Archivo</p>
          <h1 id="archivo-title">Más textos</h1>
        </div>
        <div>
          <ArchiveList posts={posts} />
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </div>
      </section>
    </main>
  );
}
