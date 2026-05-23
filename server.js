const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");
const preferredPort = Number(process.env.PORT || 3000);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(response, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Server error");
      return;
    }

    const type = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-store"
    });
    response.end(content);
  });
}

function createServer(port) {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://localhost:${port}`);
    const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    let filePath = path.join(root, safePath);

    if (url.pathname === "/" || !path.extname(filePath)) {
      filePath = path.join(root, "index.html");
    }

    if (!filePath.startsWith(root)) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    fs.stat(filePath, (error, stat) => {
      if (error || !stat.isFile()) {
        sendFile(response, path.join(root, "index.html"));
        return;
      }

      sendFile(response, filePath);
    });
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port < preferredPort + 20) {
      createServer(port + 1);
      return;
    }

    console.error(error.message);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`SalesCommand is live at http://localhost:${port}`);
  });
}

createServer(preferredPort);
