# PinWin website

Public brand website and the shared PinWin web application, deployed by Vercel project `pin-win` (team `pin-win-golf`) from `jhgolfventures/PinWin` main.

## Member application

The member routes/assets are an Expo static export of PinWin-App commit `2758471`. They use the existing production Supabase project and its browser-safe publishable key. There is no second identity database. Apple/Google flags remain disabled. No database migration is included. Current application release limitations remain recorded in PinWin-App docs/BETA_STATUS.md. This website deployment is not mobile App Store release acceptance.

`/?account=1` uses a query-conditioned Vercel rewrite to serve the exported welcome/login screen at the app's canonical `/` route. `/signup`, `/home`, `/auth/callback`, `/new-password`, `/profile` and other existing app routes use their static exports. Marketing `/` rewrites to public-home.html. There must be no physical index.html: Vercel resolves it before query-conditioned rewrites. Do not replace the app's canonical root route with an arbitrary `/login` URL.

## Rebuilding

Use the matching PinWin-App checkout; run its typecheck/tests before exporting. Export in an isolated copy with expo-router apiRoutes false and web.output static; API routes stay on the existing course proxy. Explicitly set EXPO_NO_DOTENV=1 and production EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY, EXPO_PUBLIC_COURSE_API_ORIGIN, and false social flags. Never copy .env.local into the website or export with recovery/fixture settings. Copy static output into this checkout, saving export index.html as account-entry.html and preserving marketing files/site assets. Privacy for marketing lives at website-privacy.html; privacy.html and terms.html belong to the shared app.

## News updates

The updates page prepares an explicit email request; it does not pretend to subscribe automatically. No bulk email service is connected. Account creation is independent of this optional request.

## Verification

Check all marketing pages, compact navigation, query-conditioned login, signup, confirmation callback, recovery, protected routes, signed-in dashboard, sign-out, and existing-user continuity. Client code never establishes permissions; existing RLS and authenticated RPCs remain authoritative. Keep production callback URLs exact and preserve native callbacks.
