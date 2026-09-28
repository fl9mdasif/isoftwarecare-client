/**
 * Applies the saved theme before first paint.
 *
 * This must run as a blocking inline script in <head>. Doing it in an effect
 * would paint the dark default first and then flip, which on a light-theme
 * visitor is a full-screen white flash on every navigation — the single most
 * visible way to get theming wrong.
 *
 * `suppressHydrationWarning` on <html> is required because this mutates the
 * element before React hydrates it.
 */
const SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
