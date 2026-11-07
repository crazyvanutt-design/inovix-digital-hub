<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Pages read catalog data only through `src/services/*` (never import `src/data/*` mock arrays directly in new routes); why: the services are the seam where demo data gets replaced by database/server-function calls.
- Domain types live in `src/data/types.ts`; why: keeps the future database schema and the UI aligned on one shape.
- Cart (`src/lib/cart.tsx`) and sign-in (`src/lib/demo-auth.tsx`) are browser-only demo providers mounted in `__root.tsx`; why: the prototype must work without a backend, and real auth/payments should replace these while keeping the same hook APIs.
- Global header/footer/cart drawer render in `src/routes/__root.tsx` around `<Outlet />`; why: every page shares the same shell.
- All colors come from tokens in `src/styles.css` (brand tokens `navy*`, `turquoise*`, `surface`) and button/badge variants; why: one place to adjust the visual identity.
