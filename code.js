figma.showUI(__html__, { width: 380, height: 640, title: "Video Trimmer" });

figma.ui.onmessage = async (msg) => {

  if (msg.type === 'insert-video') {
    try { 
      const { bytes, width, height, inTime, outTime } = msg;
      const uint8 = new Uint8Array(bytes);

      let fill;

      // Try native video fill (Figma API 1.0+)
      if (typeof figma.createVideoAsync === 'function') {
        const video = await figma.createVideoAsync(uint8);
        fill = {
          type:      'VIDEO',
          videoHash: video.hash,
          scaleMode: 'FILL',
        };
      } else {
        // Fallback: static image (first frame)
        const image = figma.createImage(uint8);
        fill = {
          type:       'IMAGE',
          imageHash:  image.hash,
          scaleMode:  'FILL',
        };
      }

      const frame = figma.createFrame();
      frame.resize(width, height);
      if (typeof inTime === 'number' && typeof outTime === 'number') {
        frame.name = `Video Clip (${inTime.toFixed(2)}-${outTime.toFixed(2)})`;
      } else {
        frame.name = 'Video Clip';
      }
      frame.fills = [fill];

      const center = figma.viewport.center;
      frame.x = center.x - width  / 2;
      frame.y = center.y - height / 2;

      figma.currentPage.appendChild(frame);
      figma.currentPage.selection = [frame];

      figma.ui.postMessage({ type: 'done' });

    } catch (err) {
      figma.ui.postMessage({ type: 'error', message: err.message || String(err) });
    }
  }

};
