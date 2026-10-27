/**
 * 구축형 목업 로컬 서버
 * 사용: node mockup-server.js
 * 필요: Node.js 18+ (별도 패키지 설치 없음)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 8123;

const PAGES = {
  "/": "유저웹_구축형_추가화면_목업.html",
  "/v1": "유저웹_구축형_추가화면_목업.html",
  "/v2": "유저웹_구축형_상시저장_목업_v2.html",
  "/vims": "Vd-IMS_구축형_추가화면_목업.html",
  "/vd-ims": "Vd-IMS_구축형_추가화면_목업.html",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".md": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  const name = PAGES[url] || url.replace(/^\//, "");
  const file = path.resolve(ROOT, name);

  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end("forbidden");
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(
        "not found: " + name + "\n\n" +
        "사용 가능한 경로:\n" +
        "  /       유저웹 v1\n" +
        "  /v2     유저웹 v2 (상시저장)\n" +
        "  /vims   Vd-IMS 추가 화면\n"
      );
      return;
    }
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("  구축형 목업 서버 실행 중");
  console.log("  http://localhost:" + PORT + "/        유저웹 v1");
  console.log("  http://localhost:" + PORT + "/v2      유저웹 v2");
  console.log("  http://localhost:" + PORT + "/vims    Vd-IMS");
  console.log("");
  console.log("  종료: Ctrl+C");
  console.log("");
});
