# barriobero

Blog personal minimalista preparado para Next.js, Decap CMS, Git y despliegue en Netlify o Vercel.

## Flujo

1. El frontend vive en `app/`.
2. Los artículos editables viven en `content/posts/*.md`.
3. Decap CMS está en `public/admin/`.
4. El repositorio se conecta a GitHub.
5. Netlify o Vercel despliega el sitio.
6. El dominio `barriobero.es` apunta al hosting.

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:3000`.

## Decap CMS

En producción, el editor estará en:

```text
https://barriobero.es/admin/
```

Para usar Decap con Netlify:

1. Sube el proyecto a GitHub.
2. Crea un sitio en Netlify desde ese repositorio.
3. Activa Identity.
4. Activa Git Gateway.
5. Invita tu email como usuario.
6. Entra en `/admin/` y crea o edita artículos.
