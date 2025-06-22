
<img width="1646" alt="amukta-deepgram" src="https://github.com/user-attachments/assets/4c2d7d9d-8f81-4aa2-a338-9e54ad692f5e" />
# Speech-to-Text with Deepgram

This project uses the Deepgram API to provide live speech-to-text transcription directly in the browser.

## How to Run

1.  **Get a Deepgram API Key:**
    *   Sign up for a free account at [Deepgram](https://deepgram.com/).
    *   Navigate to your dashboard and create a new API key.
    *   **This key is temporary.** For a production app, you would use a server to generate short-lived keys.

2.  **Update the API Key:**
    *   Open the `script.js` file.
    *   Find the line `const DEEPGRAM_API_KEY = 'YOUR_DEEPGRAM_API_KEY';`
    *   Replace `'YOUR_DEEPGRAM_API_KEY'` with the key you just created.

3.  **Run a Local Server:**
    *   You cannot simply open `index.html` in your browser due to security policies (CORS). You must use a local server.
    *   If you have Python installed, the easiest way is to run this command from the `speech-to-text-deepgram` directory:
        ```bash
        python -m http.server
        ```
    *   If you have Node.js, you can use `npx`:
        ```bash
        npx http-server .
        ```

4.  **Open in Browser:**
    *   Navigate to `http://localhost:8000` (or the port specified by your server).
    *   Grant microphone permissions when prompted.
    *   Click "Start Listening" and begin speaking!

## How It Works
The application captures audio from your microphone using the `MediaRecorder` API. This audio is streamed over a WebSocket to Deepgram's real-time transcription service. As Deepgram processes the audio, it sends back transcriptions, which are then displayed in the text area. 
