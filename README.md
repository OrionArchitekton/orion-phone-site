# orion-phone-site

Vite/React microsite for the `orion-phone` project page at
`https://www.danmercede.com/works/orion-phone/`.

## Role

This repo owns the presentation surface for `orion-phone`: layout, copy,
metadata, static assets, and Vercel cache config. The source project
(https://github.com/OrionArchitekton/orion-phone-oss) owns the CLI, the MCP server,
tests, specs, and releases.

## Source Of Truth

- Product repo: https://github.com/OrionArchitekton/orion-phone-oss
- Site copy: `constants.ts`
- Metadata: `index.html`
- Open Graph card: `og-card-template.html`, rendered to `public/og-card.png` (1200x630)
- Cache config: `vercel.json`

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Boundaries

Keep claims grounded in the source project's README, SECURITY.md and released
behavior. Public material shows neutral apps only (Settings, Clock).

## License

The site source code is MIT licensed; see `LICENSE`. The phone tool has its own
MIT grant in its source repository. Third-party dependencies retain their licenses.
The MIT grant does not grant trademark rights in the Dan Mercede name or branding.
