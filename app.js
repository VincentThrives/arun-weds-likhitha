(function () {
  const W = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), W) || "";
  const fmt = (d, opts) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...opts }).format(d);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mapLink = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

  /* ---------- bind simple text ---------- */
  $$("[data-bind]").forEach((el) => (el.textContent = get(el.dataset.bind)));

  const wedding = new Date(W.weddingDate);
  $("#heroDay").textContent = fmt(wedding, { weekday: "long" });
  $("#heroDate").textContent = fmt(wedding, { day: "numeric", month: "long", year: "numeric" });

  /* ---------- envelope intro ---------- */
  const intro = $("#intro"), env = $("#envelope"), music = $("#musicBtn");
  let audio = null;
  if (W.music) {
    audio = new Audio(W.music);
    audio.loop = true;
    music.hidden = false;
    music.addEventListener("click", () => (audio.paused ? audio.play() : audio.pause()));
    audio.addEventListener("play", () => music.classList.add("playing"));
    audio.addEventListener("pause", () => music.classList.remove("playing"));
  }
  function openInvite() {
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    if (audio) audio.play().catch(() => {});
    burst();
    setTimeout(() => {
      intro.classList.add("gone");
      document.body.classList.remove("locked");
      revealHero();
    }, 2100);
  }
  $("#openBtn").addEventListener("click", openInvite);
  env.addEventListener("click", openInvite);

  /* ---------- mandala ---------- */
  (function drawMandala() {
    const svg = $("#mandala"), ns = "http://www.w3.org/2000/svg";
    let html = "";
    const ring = (n, rx, ry, dist, sw) => {
      for (let i = 0; i < n; i++) {
        const a = (360 / n) * i;
        html += `<ellipse cx="0" cy="-${dist}" rx="${rx}" ry="${ry}" transform="rotate(${a})" fill="none" stroke="currentColor" stroke-width="${sw}"/>`;
      }
    };
    ring(12, 14, 40, 52, 1); ring(24, 9, 30, 120, .8); ring(36, 5, 22, 170, .6); ring(8, 26, 60, 70, .6);
    [40, 92, 150, 192].forEach((r) => (html += `<circle r="${r}" fill="none" stroke="currentColor" stroke-width=".6"/>`));
    for (let i = 0; i < 72; i++) html += `<circle cx="0" cy="-198" r="1.6" fill="currentColor" transform="rotate(${i * 5})"/>`;
    svg.innerHTML = html;
  })();

  /* ---------- hero image + parallax ---------- */
  if (W.heroImage) {
    const bg = $("#heroBg");
    bg.style.backgroundImage = `url("${W.heroImage}")`;
    bg.classList.add("has-img");
    $(".hero").classList.add("photo");
    window.addEventListener("scroll", () => { bg.style.transform = `translateY(${window.scrollY * 0.3}px)`; }, { passive: true });
  }
  function revealHero() { $$(".hero .reveal").forEach((el, i) => setTimeout(() => el.classList.add("in"), 150 * i)); }

  /* ---------- countdown ---------- */
  function tick() {
    let ms = Math.max(0, wedding - Date.now());
    const d = Math.floor(ms / 864e5); ms -= d * 864e5;
    const h = Math.floor(ms / 36e5); ms -= h * 36e5;
    const m = Math.floor(ms / 6e4); ms -= m * 6e4;
    const s = Math.floor(ms / 1e3);
    $("#cdD").textContent = d; $("#cdH").textContent = String(h).padStart(2, "0");
    $("#cdM").textContent = String(m).padStart(2, "0"); $("#cdS").textContent = String(s).padStart(2, "0");
  }
  tick(); setInterval(tick, 1000);

  /* ---------- portraits ---------- */
  [["#groomPhoto", W.groom.photo], ["#bridePhoto", W.bride.photo]].forEach(([sel, src]) => {
    if (src) $(sel).innerHTML = `<img src="${esc(src)}" alt="" loading="lazy" />`;
  });

  /* ---------- hosts ---------- */
  $("#hosts").innerHTML = (W.hosts || []).map((h) => `<li>${esc(h)}</li>`).join("");
  $$(".place, .ptitle, .blessing, .elders").forEach((el) => { if (!el.textContent.trim()) el.remove(); });

  /* ---------- story ---------- */
  $("#storyText").innerHTML = (W.story || []).map((p) => `<p class="reveal">${esc(p)}</p>`).join("");
  if (!W.story || !W.story.length) $("#story").remove();

  /* ---------- events ---------- */
  const ICONS = {
    haldi: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M14 30h36l-4 20a6 6 0 0 1-6 5H24a6 6 0 0 1-6-5z"/><path d="M10 30h44"/><path d="M32 8c-6 6-6 12 0 16 6-4 6-10 0-16z"/><path d="M22 14c-2 6 0 10 6 12M42 14c2 6 0 10-6 12"/></svg>',
    reception: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 8h10l-1 16a4 4 0 0 1-8 0z"/><path d="M25 28v24M19 52h12"/><path d="M36 8h10l-1 16a4 4 0 0 1-8 0z"/><path d="M41 28v24M35 52h12"/><path d="M50 10l6-4M52 16h7M14 10l-6-4"/></svg>',
    muhurtham: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M32 56c-10-8-18-14-18-26a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 12-8 18-18 26z"/><path d="M32 6v6M24 8l2 5M40 8l-2 5"/><circle cx="32" cy="32" r="4"/></svg>',
  };
  const tl = $("#timeline");
  W.events.forEach((ev, i) => {
    const s = new Date(ev.start), e = new Date(ev.end || ev.start);
    const main = ev.icon === "muhurtham";
    const card = document.createElement("article");
    card.className = "event reveal" + (main ? " main" : "");
    card.style.transitionDelay = i * 0.12 + "s";
    card.innerHTML = `
      <div class="ev-icon">${ICONS[ev.icon] || ICONS.muhurtham}</div>
      <p class="kn">${esc(ev.subtitle || "")}</p>
      <h3>${esc(ev.name)}</h3>
      <p class="ev-date">${fmt(s, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</p>
      <p class="ev-time">${ev.timeLabel ? esc(ev.timeLabel) : fmt(s, { hour: "numeric", minute: "2-digit" }) + " – " + fmt(e, { hour: "numeric", minute: "2-digit" })}</p>
      ${ev.note ? `<p class="ev-dress">${esc(ev.note)}</p>` : ""}
      <p class="ev-venue">${esc(ev.venue || "")}</p>
      ${ev.dress ? `<p class="ev-dress">Dress code · ${esc(ev.dress)}</p>` : ""}
      <div class="ev-links">
        ${ev.mapQuery ? `<a href="${W.venue.mapsLink || mapLink(ev.mapQuery)}" target="_blank" rel="noopener">Map</a>` : ""}
        <button type="button" data-ics="${i}">Save the date</button>
      </div>`;
    tl.appendChild(card);
  });
  tl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ics]");
    if (b) downloadICS([W.events[+b.dataset.ics]]);
  });

  /* ---------- calendar (.ics) ---------- */
  const icsDate = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  function downloadICS(events) {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ArunLikhitha//Wedding//EN"];
    events.forEach((ev, i) => {
      lines.push("BEGIN:VEVENT", `UID:al-wedding-${i}-${icsDate(ev.start)}`, `DTSTAMP:${icsDate(Date.now())}`,
        `DTSTART:${icsDate(ev.start)}`, `DTEND:${icsDate(ev.end || ev.start)}`,
        `SUMMARY:${ev.name} — ${W.groom.name} & ${W.bride.name}`, `LOCATION:${(ev.venue || "").replace(/,/g, "\\,")}`, "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
    a.download = "Arun-Likhitha-Wedding.ics";
    a.click();
  }
  $("#calBtn").addEventListener("click", () => downloadICS(W.events));

  /* ---------- venue ---------- */
  const venueUrl = W.venue.mapsLink || mapLink(W.venue.mapQuery || W.venue.address);
  $("#dirBtn").href = venueUrl;
  $("#heroLoc").href = venueUrl;
  $("#shareLocBtn").addEventListener("click", async () => {
    const text = `📍 ${W.venue.name}
${W.venue.address}
${venueUrl}`;
    if (navigator.share) { try { await navigator.share({ title: W.venue.name, text, url: venueUrl }); } catch (_) {} return; }
    try { await navigator.clipboard.writeText(text); $("#locNote").textContent = "Location copied — paste it anywhere 📍"; }
    catch (_) { window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener"); }
  });
  const V = W.venue;
  $("#mapFrame").src = "https://maps.google.com/maps?q=" + encodeURIComponent(V.embedQuery || V.mapQuery || V.address) +
    (V.lat ? "&ll=" + V.lat + "," + V.lng : "") + "&z=16&hl=en&output=embed";

  /* ---------- gallery ---------- */
  const mas = $("#masonry");
  const photos = W.gallery || [];
  if (photos.length) {
    mas.innerHTML = photos.map((src, i) => `<figure class="reveal" data-i="${i}"><img src="${esc(src)}" alt="" loading="lazy" /></figure>`).join("");
  } else {
    $("#gallery").remove();   // no photos yet: hide the section
  }
  const lb = $("#lightbox"), lbImg = $("#lbImg");
  let cur = 0;
  const show = (i) => { cur = (i + photos.length) % photos.length; lbImg.src = photos[cur]; };
  mas.addEventListener("click", (e) => {
    const f = e.target.closest("figure[data-i]");
    if (!f) return;
    show(+f.dataset.i); lb.hidden = false; document.body.style.overflow = "hidden";
  });
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };
  $(".lb-close").onclick = closeLb;
  $(".lb-prev").onclick = () => show(cur - 1);
  $(".lb-next").onclick = () => show(cur + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let tx = 0;
  lb.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); });

  /* ---------- film ---------- */
  const v = W.video || {};
  if (v.youtubeId) {
    $("#filmFrame").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}?rel=0&modestbranding=1" title="Our film" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  } else if (v.file) {
    $("#filmFrame").innerHTML = `<video src="${esc(v.file)}" ${v.poster ? `poster="${esc(v.poster)}"` : ""} controls playsinline preload="metadata"></video>`;
  }
  if (!v.youtubeId && !v.file) $("#film").remove();   // no film yet: hide the section
  // pause background music while the film plays
  else $("#filmFrame").addEventListener("play", () => audio && audio.pause(), true);

  /* ---------- RSVP ---------- */
  if (W.rsvpBy) $("#rsvpBy").textContent = "Kindly respond by " + W.rsvpBy;
  $("#rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target), note = $("#formNote");
    const name = (f.get("name") || "").trim();
    if (!name) { note.textContent = "Please tell us your name 🙏"; e.target.name.focus(); return; }
    const text = `🌸 RSVP — ${W.groom.name} & ${W.bride.name}\n\nName: ${name}\nResponse: ${f.get("attend")}\nGuests: ${f.get("guests")}` +
      (f.get("msg").trim() ? `\nBlessings: ${f.get("msg").trim()}` : "");
    const url = (W.rsvpWhatsApp ? `https://wa.me/${W.rsvpWhatsApp}` : "https://wa.me/") + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noopener");
    note.textContent = "Thank you, " + name.split(" ")[0] + "! Your blessings mean the world to us.";
    burst();
  });

  /* ---------- top-right social ---------- */
  const inviteText = "You're invited to the wedding of " + W.groom.name + " & " + W.bride.name + " 💐\n" + location.href;
  $("#waLink").href = W.whatsapp
    ? "https://wa.me/" + W.whatsapp + "?text=" + encodeURIComponent("Namaskara! 🙏 Congratulations on the wedding!")
    : "https://wa.me/?text=" + encodeURIComponent(inviteText);
  $("#igLink").href = W.instagram || "https://www.instagram.com/explore/tags/" + W.hashtag.replace(/^#/, "").toLowerCase() + "/";

  /* ---------- share ---------- */
  $("#shareBtn").addEventListener("click", async () => {
    const data = { title: "Arun & Likhitha — Wedding Invitation", text: "You're invited to the wedding of Arun Gowda K & Likhitha H K 💐", url: location.href };
    if (navigator.share) { try { await navigator.share(data); } catch (_) {} }
    else window.open("https://wa.me/?text=" + encodeURIComponent(data.text + "\n" + data.url), "_blank", "noopener");
  });

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => { if (!el.closest(".hero")) io.observe(el); });

  /* ---------- falling petals ---------- */
  const cv = $("#petals"), cx = cv.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["#c2203b", "#e8c98a", "#f2a7b4", "#b8893b", "#9e1730"];
  let P = [], WD, HT;
  const size = () => { const r = devicePixelRatio || 1; WD = innerWidth; HT = innerHeight; cv.width = WD * r; cv.height = HT * r; cx.setTransform(r, 0, 0, r, 0, 0); };
  size(); addEventListener("resize", size);
  const mk = (y) => ({ x: Math.random() * WD, y: y ?? -20, s: 4 + Math.random() * 5, vy: .5 + Math.random() * 1.1,
    vx: -.3 + Math.random() * .6, r: Math.random() * 6.28, vr: -.03 + Math.random() * .06, sw: Math.random() * 6.28,
    c: COLORS[(Math.random() * COLORS.length) | 0], a: .55 + Math.random() * .4 });
  const ambient = WD < 700 ? 9 : 20;
  for (let i = 0; i < ambient; i++) P.push(mk(Math.random() * HT));
  function burst() { if (reduced) return; for (let i = 0; i < 70; i++) { const p = mk(-Math.random() * HT * .5); p.vy += 1.2; p.burst = true; P.push(p); } }
  function frame() {
    cx.clearRect(0, 0, WD, HT);
    P.forEach((p) => {
      p.sw += .02; p.x += p.vx + Math.sin(p.sw) * .6; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.globalAlpha = p.a; cx.fillStyle = p.c;
      cx.beginPath(); cx.ellipse(0, 0, p.s, p.s * .55, 0, 0, 6.28); cx.fill(); cx.restore();
      if (p.y > HT + 20) { if (p.burst) p.dead = true; else Object.assign(p, mk()); }
    });
    P = P.filter((p) => !p.dead);
    requestAnimationFrame(frame);
  }
  if (!reduced) frame();
})();
