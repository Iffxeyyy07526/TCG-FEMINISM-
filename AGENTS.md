# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview
"The Capital Guru" — a Next.js 15 (App Router) trading signals subscription platform for the Indian market (NSE/BSE). Uses Supabase for auth/database and Resend for transactional email.

### Services

| Service | How to run | Notes |
|---------|-----------|-------|
| Next.js dev server | `npm run dev` (port 3000) | Main application |
| Supabase | Cloud-hosted (no local instance) | Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` |
| Resend | Cloud API (optional) | App gracefully degrades without `RESEND_API_KEY` — emails are skipped with console warnings |

### Key Commands
See `package.json` scripts: `dev`, `build`, `start`, `lint`, `clean`.

### Non-obvious Caveats
- **Supabase email confirmation**: The Supabase project has email confirmations enabled. Registration will fail with "Error sending confirmation email" if Supabase's built-in email rate limits are hit. For development, consider disabling email confirmations in the Supabase dashboard under Auth > Settings.
- **Service role key**: Admin operations (approving users, deploying signals, managing settings) require `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. This key is not available via the MCP tool — it must be obtained from the Supabase dashboard under Settings > API.
- **Supabase project**: The app uses the older Supabase project `ypfdkjcofnsdehwjiqus` ("The capital guru") which has the matching schema (profiles, signals, settings, coupons tables). The newer project `ifxpakjdrolmyvnbnnwb` has a different schema.
- **Standalone output**: `next.config.ts` has `output: 'standalone'` which is for containerized deployment. This does not affect local dev.
- **HMR disable flag**: Setting `DISABLE_HMR=true` disables hot module replacement (used in AI Studio). Do not set this for normal development.
- **ESLint**: Two config files exist (`.eslintrc.json` and `eslint.config.mjs`). The flat config in `eslint.config.mjs` is the active one for ESLint 9.
- **No automated tests**: The project has no test framework or test files. Quality checks are limited to `npm run lint` and `npm run build`.
