import { getHomePosts } from "../lib/posts";
import { ArchiveList, Pagination, PostMeta } from "./ui";

export default function HomePage() {
  const { leadPost, secondaryPosts, archivePosts, archivePageCount } = getHomePosts();

  return (
    <main id="inicio" className="page-shell">
      <section className="content-grid" aria-label="Contenido principal">
        <div className="main-column" id="articulos">
          {leadPost ? (
            <article className="lead-post">
              <PostMeta post={leadPost} showReadingTime />
              <h1>
                <a href={`/posts/${leadPost.slug}`}>{leadPost.title}</a>
              </h1>
              <p>{leadPost.excerpt}</p>
            </article>
          ) : null}

          <div className="post-list">
            {secondaryPosts.map((post) => (
              <article key={post.slug}>
                <PostMeta post={post} />
                <h2>
                  <a href={`/posts/${post.slug}`}>{post.title}</a>
                </h2>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="side-column" aria-label="Información lateral">
          <section className="about" id="sobre-mi">
            <p className="eyebrow">Sobre mí</p>
            <h2>Hola, soy Jorge.</h2>
            <p>Este espacio puede funcionar como diario intelectual, bitácora de proyectos y archivo de ideas.</p>
          </section>

          <section className="topics" aria-label="Temas">
            <p className="eyebrow">Temas</p>
            <div>
              <a href="/#articulos">Ensayos</a>
              <a href="/#articulos">Lecturas</a>
              <a href="/#articulos">Viajes</a>
              <a href="/#articulos">Trabajo creativo</a>
            </div>
          </section>

          <form className="newsletter" aria-label="Suscripción al blog">
            <label htmlFor="email">Carta mensual</label>
            <div className="input-row">
              <input id="email" type="email" placeholder="tu@email.com" autoComplete="email" />
              <button type="submit">Enviar</button>
            </div>
          </form>
        </aside>
      </section>

      <section className="archive" id="archivo" aria-labelledby="archivo-title">
        <div className="archive-heading">
          <p className="eyebrow">Archivo</p>
          <h2 id="archivo-title">Más textos</h2>
        </div>
        <div>
          <ArchiveList posts={archivePosts} />
          <Pagination currentPage={1} pageCount={archivePageCount} />
        </div>
      </section>
    </main>
  );
}
