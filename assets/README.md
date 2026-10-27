# Media for the invitation

Drop files here, then list them in `../config.js`:

| Folder    | What                                   | config.js field                  |
|-----------|----------------------------------------|----------------------------------|
| photos/   | hero.jpg (wide, ~2400px), groom.jpg, bride.jpg (portrait), gallery 01.jpg… | `heroImage`, `groom.photo`, `bride.photo`, `gallery` |
| photos/   | og-cover.jpg (1200x630) — WhatsApp link preview | `og:image` in index.html |
| video/    | prewedding.mp4 (or use a YouTube id instead) | `video.file` / `video.youtubeId` |
| music/    | song.mp3                               | `music`                          |

Tip: compress photos to under ~400 KB each (squoosh.app) so the link opens fast on mobile data.
