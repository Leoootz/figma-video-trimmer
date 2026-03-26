![Video Trimmer Header](assets/fvt.png)

# Video Trimmer — Figma Plugin

Trim any video with a visual timeline and insert it directly into the Figma canvas as a native video fill.

---

## Features

- **Visual timeline** with auto-generated thumbnails from the video
- **Draggable In / Out handles** to select the clip range
- **Numeric time inputs** for precise frame-accurate control
- **Scrubbing & preview** — click anywhere on the timeline or use the play button to preview the selected range
- **Native video fill** — inserts the video inside a Figma Frame using Figma's built-in `VIDEO` fill type, so it plays in prototype mode
- **Original dimensions** — the Frame is sized to match the video's native resolution

---

## Installation (Development)

1. Open **Figma Desktop** (the plugin requires the desktop app)
2. Go to **Plugins → Development → Import plugin from manifest...**
3. Select the `manifest.json` file from this folder
4. The plugin will appear under **Plugins → Development → Video Trimmer**

---

## File Structure

```
video-trimmer/
├── manifest.json   ← Figma plugin manifest
├── code.js         ← Plugin sandbox code (runs in Figma's JS environment)
├── ui.html         ← Plugin UI (runs in an iframe)
└── README.md
```

---

## How to Use

1. **Open the plugin** from Plugins → Development → Video Trimmer
2. **Drop or select a video** (MP4, MOV, WebM)
3. **Set In / Out points** by dragging the white handles on the timeline, or type the times directly into the In / Out inputs
4. **Preview** the clip using the play button — playback is constrained to the selected range
5. Click **Insert into Figma** — the video is placed as a Frame on the current page, centered in the viewport

---

## Important Notes

### Video trimming
Figma's native `VIDEO` fill plays the **full file**; it cannot trim by `inTime/outTime` metadata.

This plugin fixes that by trimming the selected segment inside the UI (using `MediaRecorder` on `video.captureStream()`) and only then sending the trimmed bytes to `code.js` for insertion.

Notes:
- The first trim may take a while because the browser needs to initialize the capture/encoder.
- If `MediaRecorder`/`captureStream` is not supported in your environment, the insert will error (not insert the untrimmed file).

### Video fill & prototypes
The inserted Frame uses `type: 'VIDEO'` as its fill. This means:
- In the **editor**, Figma shows a static thumbnail
- In **prototype mode**, the video plays automatically on the frame

### File size
Large video files (>100 MB) may be slow to transfer from the UI iframe to the plugin sandbox. For best results, use compressed MP4 files.

### Figma API version
Requires Figma Plugin API **1.0.0** or later. `figma.createVideoAsync` must be available. If it isn't (older Figma versions), the plugin falls back to a static image fill.

---

## Development

No build step required. Edit `code.js` and `ui.html` directly and reload the plugin in Figma with **⌘⌥P** (Mac) or **Ctrl+Alt+P** (Windows).

---

## Credits

Plugin by [asierleoz.com](https://asierleoz.com)
