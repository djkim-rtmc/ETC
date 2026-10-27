const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "RTMC_원격진료_자체서비스_목업.html");
const h = fs.readFileSync(p, "utf8");
const m = h.match(/const PATIENT_PROPOSAL_BASE64="([^"]+)"/);
const html = Buffer.from(m[1], "base64").toString("utf8");
fs.writeFileSync(path.join(__dirname, "_proposal_decoded.html"), html, "utf8");
