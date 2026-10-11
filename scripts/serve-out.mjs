import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";

const basePath = process.env.STATIC_BASE_PATH ?? "/coffeeshop-demo";
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";
const outDir = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(urlPath) {
  let relative = urlPath.slice(basePath.length) || "/";
  if (relative.endsWith("/")) {
    relative += "index.html";
  }
  const safe = normalize(relative).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = join(outDir, safe);
  if (!filePath.startsWith(outDir)) {
    return null;
  }
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath;
  }
  const htmlFallback = join(outDir, `${safe}.html`);
  if (existsSync(htmlFallback)) {
    return htmlFallback;
  }
  return join(outDir, "404.html");
}

const server = createServer((req, res) => {
  const url = req.url?.split("?")[0] ?? "/";

  if (url === "/" || url === "") {
    res.writeHead(302, { Location: `${basePath}/` });
    res.end();
    return;
  }

  if (!url.startsWith(basePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const filePath = resolveFile(url);
  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = extname(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Serving ${outDir} at http://${host}:${port}${basePath}/`);
});
