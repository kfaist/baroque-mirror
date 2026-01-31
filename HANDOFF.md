# Baroque Mirror — Agent Handoff Prompt

## Who You're Helping
Krista Faist, artist building an interactive AI art installation called "Baroque Mirror" for the Columbus Museum of Art's Wonderball 2026 gala. Visitors look into a webcam and see themselves transformed into baroque-style AI portraits in real-time.

## Project Location
- **Code:** `C:\Users\Krista\Desktop\baroque-mirror-deploy\public\index.html` (single-file app — HTML/CSS/JS)
- **Backup:** `C:\Users\Krista\Desktop\baroque-mirror-deploy\backups\`
- **GitHub:** https://github.com/kfaist/baroque-mirror.git (auto-deploys to Railway on push to main)
- **Live URL:** https://baroque-mirror-production.up.railway.app
- **Bug report draft:** `C:\Users\Krista\Desktop\daydream-bug-report.txt`

## Tech Stack
- **Camera capture:** WebRTC via browser getUserMedia
- **AI processing:** Daydream API (api.daydream.live/v1) — wraps Livepeer's AI video pipeline
- **Video output:** HLS streaming via hls.js
- **AI model:** stabilityai/sdxl-turbo with depth + tile controlnets and FaceID IP adapter
- **Deployment:** Railway with GitHub auto-deploy
- **Pipeline flow:** Webcam → WebRTC WHIP → Daydream/Livepeer AI → HLS stream → display

## CRITICAL: Daydream API is DOWN (3+ days as of Jan 31, 2026)
The core AI processing service has been in outage:
- **Playground** (ai.livepeer.com/playground): returns 404 Not Found
- **API** (api.daydream.live/v1/streams/{id}): returns 502 Bad Gateway
- **Streams create successfully** but AI never processes them (meta.live stays 0)
- **ICE connects then disconnects** after ~10s (backend GPU servers not running)
- **This is a server-side infrastructure issue**, not a client/network problem

### Workarounds Already Implemented
1. **PATCH disabled** — CORS blocks ICE restart via WHIP PATCH on Livepeer; code skips to full reconnect
2. **Polls Livepeer directly** — `livepeer.studio/api/playback/{playbackId}` instead of broken Daydream API
3. **30s ICE disconnect tolerance** — prevents spam reconnects during brief backend hiccups
4. **Fallback overlay system** — graceful error states shown to visitors instead of blank screen
5. **Video fade-in** — output fades in over 1.2s when stream goes live

## Key Contacts at Daydream/Livepeer
- **Shih-Yu Hwang** — shihyu@daydream.live (invited Krista to AI Video Program Cohort 2)
- **Vibor Cipan** — vibor@livepeer.org (DevRel/Community)
- **Discord:** Bug report already posted in Daydream Discord; other users confirmed same issues

## Krista's Status with Daydream
- 1,000+ minutes logged (rare power user)
- Personally invited to Cohort 2 (Feb 9-20, applications close Feb 6)
- Already applied; sent enthusiastic response to invite email

## What's Working Right Now
- Camera capture and display (webcam pip)
- Full UI: style buttons, sliders, prompt system, mode slider (baroque ↔ caricature)
- Background animation (audio-reactive noise field + particles)
- Capture system (screenshot + localStorage)
- Rainbow countdown watermark (7-10 min session timer)
- Fallback overlay with three states (timeout / error / disconnect)
- Livepeer direct polling (bypasses broken Daydream API)
- Deployment pipeline (git push → Railway)

## What's Broken / Blocked
- **AI video processing** — entirely dependent on Daydream service recovery
- **PATCH for runtime parameter updates** — may have CORS issues (untested since outage)
- **Face preservation tuning** — can't test until service is back

## Key Code Architecture
Everything is in one `index.html` file:
- **Lines ~400-660:** JavaScript state, prompt arrays, style configs
- **`start()`:** Gets camera → creates Daydream stream → connects WHIP → starts polling
- **`startPolling()`:** Polls `livepeer.studio/api/playback/{playbackId}` every 2s, connects HLS when `meta.live === 1`
- **`connectHLS(url)`:** Sets up hls.js low-latency player
- **`setParams()`:** PATCHes Daydream API with prompt/controlnet/FaceID config
- **`buildPrompt()`:** Constructs prompt from style + mode slider + custom text
- **`showFallback(reason)`:** Shows graceful overlay (timeout/error/disconnect)
- **Rainbow system:** Session timer starts at begin, rainbow drops at 7min, redirect at 10min

## API Key (already in code)
```
sk_9bFt6nHdK1T6AXG6knDS3K57u1BTS6xe9FiwqwQW52KoK7UpqBBEYnmPGxFvLJmS
```

## Face Preservation Notes (for when AI is back)
- The "Mona Lisa problem": generic preset prompts average faces toward canonical museum portraits
- **Must include:** "retain facial proportions, retain likeness, preserve identity, natural asymmetry"
- **Must avoid:** "idealized", "perfect" — these push toward generic beautiful faces
- FaceID IP adapter scale at 0.5 currently; may need tuning
- Face preservation is NON-NEGOTIABLE — visitors must recognize themselves

## Potential Plan B (if Daydream stays down)
- Local Stable Diffusion with img2img (periodic snapshots, not real-time video)
- Enhanced CSS filter mode (sepia/contrast/saturate on live webcam — already in fallback)
- Different real-time AI service (nothing directly comparable exists)

## Git Recent History
```
4639568 Polish: clean debug logs, add fallback overlay, video fade-in
4789f18 Wait for meta.live=1 (actual video) not just type=live
3d594d9 Add live check debug logging  
0aa5a07 Fix live detection - check data.type === live, log sources
737d0f7 Poll Livepeer directly instead of Daydream API
64c537d Add full stream response logging, increase ICE disconnect tolerance
9c708c3 Fix CORS ICE restart, add stream creation debug
bcd2a09 Add HLS URL debugging and validation
```

## Working Style
Krista prefers autonomous problem-solving — take direct action rather than giving step-by-step guidance. Use `edit_block` for code changes, git commit and push for deploys. Always backup before major changes (`xcopy` to backups folder). Test with browser dev tools, curl, and live deployment.
