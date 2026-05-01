export function PostMeta({ post, showReadingTime = false }) {
  return (
    <div className="post-meta">
      <span>{post.category}</span>
      <time dateTime={post.date}>{post.displayDate}</time>
      {showReadingTime ? <span>{post.readingTime}</span> : null}
    </div>
  );
}

export function ArchiveList({ posts }) {
  return (
    <div className="archive-list">
      {posts.map((post) => (
        <a href={`/posts/${post.slug}`} key={post.slug}>
          <time dateTime={post.date}>{post.shortDate}</time>
          <span>{post.title}</span>
          <strong>{post.category}</strong>
        </a>
      ))}
    </div>
  );
}

export function Pagination({ currentPage, pageCount }) {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const previousHref = currentPage === 2 ? "/#archivo" : `/archivo/${currentPage - 1}`;
  const nextHref = `/archivo/${currentPage + 1}`;

  return (
    <nav className="pagination" aria-label="Paginación del archivo">
      {currentPage > 1 ? <a href={previousHref}>Anterior</a> : <span>Anterior</span>}
      <div>
        {pages.map((page) => {
          const href = page === 1 ? "/#archivo" : `/archivo/${page}`;
          const isCurrent = page === currentPage;

          return isCurrent ? (
            <span aria-current="page" key={page}>{page}</span>
          ) : (
            <a href={href} key={page}>{page}</a>
          );
        })}
      </div>
      {currentPage < pageCount ? <a href={nextHref}>Siguiente</a> : <span>Siguiente</span>}
    </nav>
  );
}
