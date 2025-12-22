# Baroque Mirror: Self-Portrait

**Live AI Art Transformation for CMA Wonderball 2026**

By Krista Faist

## About

Baroque Mirror is an interactive AI art installation that transforms live video into baroque-style portraits in real-time. Participants see themselves rendered as classical oil paintings or French Revolution caricatures, with audio-reactive visual effects.

## Features

- Real-time AI video transformation via Daydream.live
- Multiple artistic styles: Baroque, Rococo, Caravaggio, Vermeer, Rembrandt, Artemisia
- Style blending slider (Opulent Oil Painting ↔ French Revolution Caricatures)
- Audio-reactive particle systems and background animations
- Still capture with print ordering (Printful/Shopify) and NFT minting (Verisart)
- Fullscreen mode for installation display

## Deployment

This app is configured for Railway deployment.

### Deploy to Railway

1. Push to GitHub
2. Connect repo to Railway
3. Railway will auto-detect Node.js and deploy

### Environment Variables

No environment variables required for basic deployment.

## Local Development

```bash
npm install
npm start
```

Visit http://localhost:3000

## Tech Stack

- Express.js (static server)
- HLS.js (video streaming)
- Daydream.live API (AI transformation)
- Canvas API (audio-reactive visuals)
- WebRTC (camera input)

## License

MIT

---

Created for Columbus Museum of Art Wonderball 2026
