
<img width="1646" alt="amukta-deepgram" src="https://github.com/user-attachments/assets/4c2d7d9d-8f81-4aa2-a338-9e54ad692f5e" />


## Speech-to-Text with Deepgram

Browser-based live transcription using Deepgram API.

### How to Run

1. **Get API Key**

   * Sign up at [deepgram.com](https://deepgram.com) and create an API key.

2. **Add API Key**

   * In `script.js`, replace `'YOUR_DEEPGRAM_API_KEY'` with your key.

3. **Start Local Server**

   * Python: `python -m http.server`
   * Node.js: `npx http-server .`

4. **Open in Browser**

   * Go to `http://localhost:8000`
   * Allow mic access and click **Start Listening**

### How It Works

Captures audio with `MediaRecorder`, streams to Deepgram via WebSocket, and displays real-time transcription.
