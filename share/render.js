// Renders the invitation cards to PNG with headless Chrome (convert to JPG before committing).  Usage: node share/render.js [ids...]
const { execFileSync } = require("child_process");
const path = require("path"), os = require("os");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const dir = __dirname, url = "file:///" + path.join(dir, "cards.html").split(path.sep).join("/");
const CARDS = {
  1: ["1-royal-maroon-gold", 1080, 1350], 2: ["2-ivory-minimal-arch", 1080, 1350], 3: ["3-sage-botanical", 1080, 1350],
  4: ["4-temple-traditional", 1080, 1350], 5: ["5-emerald-art-deco", 1080, 1350], 6: ["og-cover", 1200, 630],
  7: ["6-ivory-gold-classic", 1080, 1350], 8: ["7-midnight-navy-gold", 1080, 1350],
};
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CARDS);
for (const id of ids) {
  const [name, w, h] = CARDS[id];
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    "--user-data-dir=" + path.join(os.tmpdir(), "chr-cards"), `--window-size=${w},${h}`, "--virtual-time-budget=9000",
    "--screenshot=" + path.join(dir, name + ".png"), `${url}?d=${id}`], { stdio: "ignore" });
  console.log("rendered", name + ".png");
}
