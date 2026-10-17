# AGENTS.md - orion-phone-site

## Repo Role

`orion-phone-site` is the Vite/React microsite for the `orion-phone` project
page. It owns presentation, metadata, static assets, and cache config for the
site surface.

## Boundaries

- Owns site copy, layout, Open Graph metadata, Vercel config, and static assets.
- Does not own the `orion-phone` implementation, release process, or security model.
- Keep product claims grounded in the source project's README, SECURITY.md, and
  released behavior. No unverified numbers; the cost figures come from the README's
  "What a task costs" section, which lists every measured run.
- Public material shows neutral apps only (Settings, Clock).

## Authority Order

1. The estate audit AGENTS.md (operator-local)
2. Source project: the orion-phone repository's README.md, SECURITY.md and pyproject.toml
3. This repo's `README.md`, `constants.ts`, `index.html`, and `vercel.json`
4. Vite build output and package scripts

## Validation

```bash
npm install
npm run build
```

For docs-only changes, run `git diff --check` at minimum.
