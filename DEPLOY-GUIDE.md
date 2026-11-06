# Put Inner Space online (Render) — step by step

When you finish, Inner Space has its own web address (like `https://inner-space-xxxx.onrender.com`).
Anyone who opens it gets Claude (Talk, Mirror, Origin…) and the ElevenLabs voice (Brian in English,
your Arabic voice in Arabic). Your keys live only inside Render; nobody can see them.

**Cost:** Render $7/month + $0.25/month for the 1 GB disk. Plus what you use on Claude and ElevenLabs.

---

## What is in this folder

| File | What it is |
|---|---|
| `inner-space.html` | The app (V100) |
| `sw.js`, `manifest.webmanifest`, `icons/` | Lets people add it to their home screen like a real app |
| `server/` | The server: Claude, the voice, and the limits that protect your bills |
| `render.yaml` | Tells Render how to run everything |
| `.gitignore` | Makes sure a key file can never be uploaded |

Optional: if your Inner Space folder on your PC has an `assets` folder (pictures, videos), copy it
into this folder too, next to `inner-space.html`.

---

## Step 1 · GitHub: a private home for the files (10 min)

Render takes the app from GitHub.

1. Go to **github.com** and sign up (free).
2. Top right **+** → **New repository**.
   - Name: `inner-space`
   - Choose **Private**
   - Click **Create repository**
3. On the next page, click **uploading an existing file**.
4. Unzip `inner-space-deploy.zip` on your PC. Open the `inner-space` folder.
   Select **everything inside it** (not the folder itself) and drag it onto the GitHub page.
   You should see `inner-space.html`, `sw.js`, `manifest.webmanifest`, `render.yaml`, `package.json`,
   `.gitignore`, `DEPLOY-GUIDE.md`, `icons`, `server`.
5. Click **Commit changes**. Wait until the upload finishes. `inner-space.html` is large (22 MB), so this can take a minute.

**Never put a key in any file you upload.**

---

## Step 2 · Render: run it (10 min)

1. Go to **render.com** → **Get Started** → sign up **with GitHub**.
2. Click **New +** → **Blueprint**.
3. Choose your `inner-space` repository → **Connect**.
4. Render reads `render.yaml` and asks for three secret values. Paste them here, and only here:
   - `ANTHROPIC_API_KEY` → your Claude key (from platform.claude.com)
   - `ELEVENLABS_API_KEY` → your ElevenLabs key
   - `ELEVENLABS_VOICE_AR` → the **Voice ID** of your Arabic voice (ElevenLabs → My Voices → your voice → copy ID).
     If you don't have one yet, leave it empty: Brian will read the Arabic too.
5. Click **Apply**. Render asks for a card for the $7 plan.
6. Wait 2–4 minutes. Open the **Logs** tab. You should see:
   ```
   Model: claude-sonnet-5-5
   Voice: ElevenLabs · Brian · Arabic: <your voice id>
   Page ready: 22.1 MB → br 11.2 MB
   ```
7. At the top of the page is your address: `https://inner-space-xxxx.onrender.com`.

---

## Step 3 · Try it on your phone (5 min)

1. Open the address in Chrome or Samsung Internet.
2. Menu → **Add to Home screen**. Now it opens like an app.
3. Play a story in **English**: the voice should be Brian. Lock the phone; it keeps talking.
4. Switch to **Arabic** (the ع button) and play a story: your Arabic voice.
5. Open **Talk** and write something: a real answer means Claude is working.

The first time anyone hears a line, it takes a second to make. After that it's saved forever and plays instantly
for everyone, for free. So play every story once yourself, in both languages, and they will be instant
for all your users.

---

## Updating the app later

When I send you a new `inner-space.html` and `sw.js`:
1. GitHub → your repository → **Add file** → **Upload files** → drop the two files → **Commit changes**.
2. Render sees it and updates by itself in about 2 minutes. Nothing else to do.

---

## What protects your money (already set up)

All of these can be changed in Render → your service → **Environment**:

| Setting | Default | Meaning |
|---|---|---|
| `LIMIT_AI_PER_HOUR` | 30 | Claude messages per person per hour |
| `LIMIT_AI_PER_DAY` | 120 | Claude messages per person per day |
| `LIMIT_AI_SERVER_PER_DAY` | 3000 | Claude messages for everyone together per day |
| `LIMIT_VOICE_CHARS_PER_DAY` | 15000 | New voice characters per person per day (about 10 stories). Saved lines never count. |
| `LIMIT_VOICE_SERVER_CHARS_PER_DAY` | 200000 | New voice characters for everyone together per day |

When a limit is reached, the app quietly falls back: Talk uses its own built-in answers, and the
voice uses the phone's own voice. Nothing breaks.

Also set a spend limit in **platform.claude.com → Billing**, and a credit limit on your ElevenLabs key.

## If something goes wrong

- **Page doesn't load:** check Render → Logs for a red error and send it to me.
- **Voice is the phone's voice, not Brian:** the ElevenLabs key is wrong or out of credits. Check Logs for `[voice] FAILED`.
- **Talk gives short built-in answers:** the Claude key is wrong or out of credit. Check Logs for `[anthropic]`.
- **A key leaked:** delete it on the provider's site, make a new one, and paste it into Render → Environment.

## V108.1 (2026-10-31)
- index.html = the Night website (shown at "/"). dawn.html = the Dawn website (open /dawn.html). To make Dawn the home page, rename dawn.html to index.html.
- inner-space.html = the app (V54.2.9.34), sw.js = inner-space-v108-2. After deploying, open the app and reload twice.
- Keys never go in these files: ANTHROPIC_API_KEY / ELEVENLABS keys live only in Render → Environment (or server/.env on your PC, which is never uploaded).

## V109 (2026-11-01)
- Three new stories in Story Mode: The Train Station, The Balloon, The Bench by the Sea (16 stories now).
- inner-space.html = the app (V54.2.9.35), sw.js = inner-space-v109-1. Both websites now list 16 stories.
- Upload the whole folder the same way as V108.1, then reload the app twice.

## V110 (2026-11-01)
- The Cave has 8 levels now. Level 6 · The Four Words (ho'oponopono, a Hawaiian beach at night), Level 7 · Tapping (EFT, a bamboo forest with stone lanterns), Level 8 · The Field (after Dr Joe Dispenza, a high rock under the stars).
- The Balloon is faster: the waits after the voice are much shorter. Each bag now falls on its own when the next scene starts, and you can still tap "Let it fall" earlier.
- The websites' Story Mode text now says sixteen stories, matching the shelf.
- inner-space.html = the app (V54.2.9.36), sw.js = inner-space-v110-1.
- Upload the whole folder the same way as before, then reload the app twice.

## V111 (2026-11-01)
- Level 8 (The Field): the sound no longer drops out. The night sounds stay on the whole time, with a soft "space" air and far-off star chimes you can hear on a phone speaker.
- A chord that is already playing is no longer struck again. In every story this stops the music from dipping for a moment.
- Faces: the glow in Level 6 is now behind the figure, not over the face. In Level 8 the energy centers fade off the face when you come back. In Level 7 the ribbon of light passes beside the head.
- On phones the new levels draw less while the voice speaks (fewer moving layers and stars), so they run smoother.
- inner-space.html = the app (V54.2.9.37), sw.js = inner-space-v111-1. Upload the whole folder the same way, then reload the app twice.

## V112 (2026-11-02)
- Real colours on Samsung Internet. Its own dark mode was repainting the art: pale cave walls, white eyes and light mouths in every story, Godly ritual, meditation and Cave level. On Samsung Internet (or wherever that forced dark mode shows up), the app now paints the art's dark colours in a way the repaint leaves alone. Nothing changes in other browsers.
- For testing: add ?fdfix=1 to the address to force this on, or ?fdfix=0 to force it off.
- inner-space.html = the app (V54.2.9.38), sw.js = inner-space-v112-1. Upload the whole folder the same way, then reload the app twice.

## V113 (2026-11-02)
- Story Mode: four new stories — The Lantern Night, The Kitchen at 3 AM, The Kite and the Stage, The Snow Globe (20 stories now).
- The Cave: Level 9 · The Lake (loving-kindness) and Level 10 · The Hot Spring (the Inner Smile). The Cave room shows every level as a picture, with one big golden Enter button.
- Godly mode: three new heart rituals — The Cradle, The Rain of Blessings, A Candle for Someone (13 jewels; two rows of seven on phones).
- Talk: warm gold look, a drawn listening mark instead of the green orb, a quiet greeting for the hour and soft openers.
- Guides: the guide for now sits in a wide card on top, the other four in a row below (2 × 2 on phones).
- Music: the play screen has a stage glow under the instrument, a round back button, a segmented Record / Sing along / Loop bar and labelled panels for play-along, lessons and tips.
- Websites: 20 stories, 13 rituals (EN + AR, both sites).
- inner-space.html = the app (V54.2.9.39), sw.js = inner-space-v113-1. Upload the whole folder the same way, then reload the app twice.

## V113.1 (2026-11-02)
- Cave Level 10 · The Hot Spring: your legs no longer vanish while you walk through the cave and across the snow. They only hide while you sit in the water.
- inner-space.html = the app (V54.2.9.40), sw.js = inner-space-v113-2. Upload the same way, then reload twice.

## V114 (2026-11-02)
- Home rebuilt (phone + PC): pictured cards under the Orb — Story Mode with real story frames, Meditate, Music, Talk, Guides, Your Body, Origin, The Tone, The Room. Scrolls; the Orb steps aside while you scroll.
- Guides: a hall of portals — the guide for now large in the middle with a turning golden ring, the other four floating around it.
- Music room: every instrument a lit tile (icon, name, line, lessons).
- Story / Godly / Cave player: the buttons sit in their own dark band under the picture, never on top of the scene.
- "Hand on heart" is now one hand on the chest (it used to cross both arms).
- Cave: stepping through the portal no longer leaves you standing inside a dark bubble — you step out and the portal fades to a ring behind you.
- Godly: a bright TAP THE ORB badge on the orb with a pulsing ring.
- The Tone: low tones were much quieter than high ones (that is how the ear works) — every tone now gets an equal-loudness lift and the base level is a little higher.
- inner-space.html = the app (V54.2.9.41), sw.js = inner-space-v114-1. Upload the whole folder the same way, then reload the app twice.

## V114.1 (2026-11-02)
- Home: taps work again (a hidden tap-target of the Memory link had spread over the whole screen). The home is now the nine doors as lit tiles under the Orb — no scrolling, nothing hidden.
- inner-space.html = the app (V54.2.9.42), sw.js = inner-space-v114-2. Upload the same way, then reload twice.

## V114.2 (2026-11-02)
- Home was dark (the Orb, the question and the first tiles nearly black): every door carried an old dark halo that was sized from its container; with the tiles in a grid each halo grew to cover the whole screen and nine of them stacked to black. Removed. Home is bright and tappable on phone, Fold and PC.
- Guides: glass portals with a turning rim of light, names in each guide's colour, a beam of light on the guide for now, the other four in a gentle arc on PC.
- inner-space.html = the app (V54.2.9.43), sw.js = inner-space-v114-3. Upload the same way, then reload twice.

## V114.3 (2026-11-02)
- "TAP THE ORB" now sits on the home Orb (the Godly door), English and Arabic; inside Godly the hint is small again.
- Back works everywhere: the room's Back button now sits above the room's content (Talk's header covered it on phones; the story shelf on PC).
- The Godly door no longer lingers over a room's header for a moment when you open a room.
- Home tiles no longer jump after loading (their place is computed from where the Orb will end up, not where it is mid-glide) and do not fade in again on re-renders.
- Phones: decorative motion rests (portal rims, halos, floats, tile bobs) — lighter.
- inner-space.html = the app (V54.2.9.44), sw.js = inner-space-v114-4. Upload the same way, then reload twice.

## V115 (2026-11-02)
- New website: index.html is the new page (the app's own look: the Orb with TAP THE ORB, the nine doors, every story card with its real frame, the ten Cave levels, Godly's eighteen techniques and thirteen rituals, the five guide portals, the music tiles, Talk, The Tone). English and Arabic (toggle at the top; remembers your choice). The old pages stay as night.html and dawn.html.
- App: TAP THE ORB is a gold pill under the Orb on the home (the hint inside Godly is gone). Talk has its own gold back button in the header — phones could not reach the room's Back button from Talk.
- inner-space.html = the app (V54.2.9.45), sw.js = inner-space-v115-1. Upload the whole folder the same way (index.html, night.html, dawn.html, globo.html, inst/, icons, manifest, sw.js, inner-space.html), then reload the app twice.

## V116 (2026-11-02) — 21 Nights
- New: **21 Nights**, a tenth door across the top of the home. Six journeys of twenty-one nights — Calm, Self-Love, Letting Go, Courage, Gratitude, and 21 Mornings. Each night one lantern waits dark on a string of twenty-one; you light it and the words are inside the glass: a breath, a sentence to say out loud, a question you may answer, or a door into one of the stories, Cave levels, rituals or one-minute techniques. Most nights take a minute or two.
- Miss a night and nothing is lost — the lantern stays dark until you come back to it. No streak to break, no restart.
- Each night you can tap one of the five skies; at the end the three weeks of sky show as a line of colour. What you write stays on the phone, and the journey shows it back to you as your own wall.
- The home fits all ten doors on one screen at every size (and scrolls only on very short ones).
- Website: a new "One lantern a night" section with the six journeys, and the 21 Nights door in the home mock.
- inner-space.html = the app (V54.2.9.47), sw.js = inner-space-v116-1. Upload the whole folder the same way, then reload the app twice.

## V116.1 (2026-11-02) — one word, not a blank page
- The first night of a journey no longer opens with an empty box. Courage, Gratitude and Letting Go all used to start by asking you to write — right at the moment you are deciding whether the journey is for you. Now the question comes with words already on the screen: tap one and the night is answered. "What is the thing you keep not doing?" → A conversation · A message · Asking · Saying no · Starting · Quitting · The doctor. There is still a small round box under the words if your word is not there.
- 20 of the 28 questions across the six journeys are now one tap. The 8 deeper ones — the ones that only make sense once you are a week or two in — stay as writing, and they are marked OPTIONAL. You can always light the lantern without answering anything.
- Night 21 hands the words back: the finish card now shows every word you left along the way, as a little cluster of what the twenty-one nights were made of.
- Arabic has its own words on every chip, not a translation of the English layout.
- inner-space.html = the app (V54.2.9.48), sw.js = inner-space-v116-2. Upload the whole folder the same way, then reload the app twice.

## V116.2 (2026-11-02) — the Orb steps aside, and the nights have a voice
- **Fixed: the Orb no longer sits on the 21 Nights screens.** Every other room hides it; 21 Nights never did, so it hung over the title at full strength and, being fixed to the screen, stayed still while the lanterns scrolled under it. That is the Orb you saw moving. Gone, and the back button now reads "Back" instead of a second "Inner Space".
- **A voice.** The night's words are read aloud, English and Arabic, in the same voice as the rest of the app — so a night works with the phone face down. A speaker button on the card stops or restarts it, and it remembers your choice. A device with no voice at all says so instead of sitting lit in silence. Nothing you tap or type is ever spoken.
- **A moment of lighting.** The lantern no longer lights itself. Press and hold it, a ring of light fills around the glass, and then it warms, the room warms with it, and the words arrive. A short press is a nudge, not a failure; if holding is hard, "Just light it" appears.
- **Three weeks, not a flat grid.** The twenty-one are laid out as three weeks of seven, each with its own count, and a line when a week closes — "One week. The hardest one is behind you."
- **A real night behind it.** Stars that breathe and two slow drifts of deeper blue, with the lantern throwing its colour into the room once it is lit. Phones and reduced-motion keep it still.
- **A reminder.** Pick a time and Inner Space nudges you that the lantern is waiting. It asks for permission only when you turn it on, and it schedules on the phone — nothing is sent anywhere. Installed to the home screen it can reach you with the app closed; either way the line is waiting for you on the home when you open it.
- inner-space.html = the app (V54.2.9.49), sw.js = inner-space-v116-3 (it now carries the reminder). Upload the whole folder the same way, then reload the app twice.

## V116.3 (2026-11-02) — 21 Nights of Calm now happens inside the lantern
- **The complaint, and it was right.** 87 of the 126 nights were a button that threw you into a story, a Cave level or Godly. 21 Nights was the app's menu wearing a lantern.
- **All 21 Calm nights are rebuilt.** Nothing opens, nothing leaves the card. The night plays right there, one to two and a half minutes, then the sky and the Done button arrive:
  - **a breath you follow** — a circle that grows as you breathe in and lets go as you breathe out, with the words on it (seven nights, no holds anywhere);
  - **a body step, drawn** — a small figure with a warm place on it: the feet, the jaw, the shoulders, the palms over your eyes, a hand on your chest (seven nights);
  - **words that arrive one at a time**, spoken, with pauses between them (three nights);
  - **something to rest your eyes on** — a flame, or a light drifting across the dark — for the longer week-end nights (three nights);
  - **a slow beat to tap with**, ten taps, four seconds apart (one night).
- Every step is **read aloud** as it arrives, English and Arabic, so the night works with the phone face down. "I'm done" ends it early at any point, and the lantern is never held hostage.
- The player runs off the **clock, not the screen** — a phone that goes dark in the middle comes back to the right moment rather than a frozen one.
- Calm is marked **PLAYS HERE** on the journey list. The other five journeys are untouched for now — tell me if Calm is right and I will rebuild them the same way.
- inner-space.html = the app (V54.2.9.50), sw.js = inner-space-v116-4. Upload the whole folder the same way, then reload the app twice.

## V117 (2026-11-03) — 21 Nights removed, the home rebuilt, two builds
- **21 Nights is gone** from the app and from the website. The home is back to nine doors.
- **The home is rebuilt for nine.** It was laid out to squeeze ten in, and it showed:
  - the doors are a real **three-by-three grid** now, at every size. The old flex-wrap broke into 3-3-2-1 on a folded Galaxy and into a ragged 5-then-4 on a laptop;
  - the little line under each name (`Presences to train with`) was `white-space:nowrap` with a 16-character cap, so every line longer than its tile **ran out over the tile next to it**. It wraps;
  - **"TAP THE ORB" no longer lands on "What do you need right now?"** The doors are placed from the pill's own box, re-measured when the Orb finishes gliding, so nothing overlaps on any screen;
  - the door height is **worked out from the space that is actually left** rather than guessed at by a stack of media queries: what is under the Orb, minus the question and the Memory line, divided by three. The "for you right now" line steps aside first, then the whispers, and the question last — only when the arithmetic says there is no room;
  - **"Memory" was 9px at 40% opacity** — invisible on a phone, completely gone on a laptop. It is readable now.
  - Checked at 412×870, 412×740, 360×640, 344×820 (Fold closed), 768×1024 (Fold open), 1366×768 and 1920×1080: nine doors, three rows, nothing below the fold, nothing clipped, no scrolling.
- **Offline mode is untouched** — the simple listener still answers when the AI server is not reachable.
- **Two builds, two zips.**
  - `inner-space-V117-PUBLIC.zip` — what you post. Developer mode is **cut out of the file**, not just switched off: the DEV chip, the dev panel, the seven-tap unlock, the Warrior DEV button, the AI-connection dot and the `?fast=1` timer shortcut are all gone, and `?dev=1` does nothing.
  - `inner-space-V117-DEV.zip` — the same app with developer mode still in it, for you.
  Both are the same folder otherwise; only `inner-space.html` differs. Never post the DEV one.
- inner-space.html = the app (V54.2.9.51), sw.js = inner-space-v117-1. Upload the whole folder, then reload the app twice.

## V118 (2026-11-04) — "3:12", a film
- **A new section in Story Mode: FILM.** A wide card at the top of the story shelf opens **3:12** — a 15-minute shadow-theatre film in five chapters about a man whose mind will not stop at night. It plays straight through: no buttons, no choices, nothing to tap. One quiet × in the corner to leave. It remembers the chapter you reached and continues from there next time; after the end it starts over.
- **A new kind of animation.** Black silhouettes with a lit edge against glowing skies, windows and screens — a paper shadow play. The replaying thoughts are literally paper puppets on the bedroom ceiling. Four characters (Sami, Lina, Um Khaled, and the Night) plus a bus full of passengers, built from one new figure rig with sixteen poses. Seventeen scenes. Three colours only: the red of the clock, the blue of a phone, the warm of a lamp.
- **Both languages.** Every line is written in Arabic, not translated; the captions and chapter cards follow the language, and the voice reads each line in the app's own voice, so the film works with the phone face down. The Night speaks in a thinner, italic caption so you always know who is talking.
- Script written first, then put through two independent cold reads as a bored phone viewer at 11 pm, and cut accordingly (the opening starts inside the act; the "Friday" meeting now makes sense; the ending lost its three instructions).
- Phones fill the screen and crop the sides; a PC sees the whole square, pillarboxed like a film.
- inner-space.html = the app (V54.2.9.52), sw.js = inner-space-v118-1. Two builds as before: PUBLIC (no developer mode) and DEV. Upload the whole folder, then reload the app twice.
