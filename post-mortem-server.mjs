/**
 * Optional local server for post-mortem-generator.html
 * - Serves the single-page app from the same directory
 * - POST /api/postmortem accepts JSON body and returns { ok: true, receivedAt }
 * - GET /api/logs returns { logs: string } — simulated rotating logs for Auto Mode
 *
 * Run: node post-mortem-server.mjs
 * Open: http://localhost:3847/post-mortem-generator.html
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3847;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json",
};

function send(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // AUTO MODE FEATURE — simulated system logs (alternates healthy vs failure ~every 20s)
  if (req.method === "GET" && url.pathname === "/api/logs") {
    const healthy = `2026-04-05T10:00:00Z INFO service: health check OK
2026-04-05T10:00:05Z INFO service: heartbeat`;
    const failure = `Error: NullPointerException at line 42
java.lang.NullPointerException: Cannot invoke method on null object reference`;
    const phase = Math.floor(Date.now() / 20000) % 2;
    const logs = phase === 0 ? healthy : failure;
    const body = JSON.stringify({ logs });
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    });
    return res.end(body);
  }

  if (req.method === "POST" && url.pathname === "/api/postmortem") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try {
      JSON.parse(raw || "{}");
    } catch {
      return send(res, 400, "Invalid JSON");
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    return res.end(JSON.stringify({ ok: true, receivedAt: new Date().toISOString() }));
  }

  let filePath = path.join(__dirname, url.pathname === "/" ? "post-mortem-generator.html" : url.pathname);
  if (!filePath.startsWith(__dirname)) return send(res, 403, "Forbidden");

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, "Not found");
    const ext = path.extname(filePath);
    fs.readFile(filePath, (e, data) => {
      if (e) return send(res, 500, "Read error");
      send(res, 200, data, MIME[ext] || "application/octet-stream");
    });
  });
});

server.listen(PORT, () => {
  console.log(`Post-mortem server http://localhost:${PORT}/post-mortem-generator.html`);
});
