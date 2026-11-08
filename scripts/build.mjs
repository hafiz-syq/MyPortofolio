import './check-node.mjs';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Set this before importing Vite: the desktop terminal can inherit development mode.
process.env.NODE_ENV = 'production';
const { build } = await import('vite');
await build({ mode: 'production' });

// Render App sekali di Node supaya HTML sudah berisi kontennya. Tanpa shell ini
// browser harus mengunduh dan menjalankan 110 kB JS dulu sebelum ada yang di-paint.
await build({
  mode: 'production',
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: 'dist-server', minify: false },
});
const { render } = await import(pathToFileURL(`${process.cwd()}/dist-server/entry-server.js`).href);
const shell = render();
rmSync('dist-server', { recursive: true, force: true });

// Halaman ini cuma punya satu stylesheet dan seluruhnya dibutuhkan sebelum paint,
// jadi CSS ditempel ke HTML: tidak ada request render-blocking tersisa.
const htmlPath = 'dist/index.html';
let html = readFileSync(htmlPath, 'utf8');
const link = /<link\b[^>]*rel="stylesheet"[^>]*>/.exec(html)?.[0];
const href = link && /href="([^"]+\.css)"/.exec(link)?.[1];
if (link && href) {
  const cssPath = 'dist' + href;
  html = html.replace(link, () => `<style>${readFileSync(cssPath, 'utf8')}</style>`);
  rmSync(cssPath);
}
const rootSlot = '<div id="root"></div>';
if (!html.includes(rootSlot)) throw new Error('root div tidak ditemukan di dist/index.html');
writeFileSync(htmlPath, html.replace(rootSlot, () => `<div id="root">${shell}</div>`));
