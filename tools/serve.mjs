/* Tiny static file server for previewing the handbook over http://
   (opening pages directly from disk works too - this is only needed for
   tools/browsers that dislike file:// relative assets).
      node tools/serve.mjs          -> http://localhost:8099
      node tools/serve.mjs 3000     -> custom port
*/
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const PORT = Number(process.argv[2]) || 8099;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".md": "text/plain; charset=utf-8", ".ico": "image/x-icon"
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    const file = join(ROOT, normalize(p).replace(/^([/\\])+/, ""));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end("forbidden"); return; }
    const s = await stat(file);
    const body = await readFile(s.isDirectory() ? join(file, "index.html") : file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("404");
  }
}).listen(PORT, () => console.log(`handbook: http://localhost:${PORT}/`));
