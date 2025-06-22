document.addEventListener('DOMContentLoaded', () => {
    const recordButton = document.getElementById('recordButton');
    const transcriptArea = document.getElementById('transcript');
    const statusDiv = document.getElementById('status');
    let isRecording = false;
    let mediaRecorder;
    let socket;
    let microphone;
    let finalTranscript = ''; // Stores the final, complete transcript

    // IMPORTANT: Double-check that this key is correct and has not expired.
    // Deepgram keys typically look like this: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    const DEEPGRAM_API_KEY = 'af4120e0eca59ee55b481eb28146834b5fb668b4';

    const connectToDeepgram = () => {
        statusDiv.textContent = 'Connecting...';
        // Connect to Deepgram's real-time transcription endpoint
        socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2&interim_results=true&smart_format=true', [
            'token',
            DEEPGRAM_API_KEY,
        ]);

        socket.onopen = () => {
            statusDiv.textContent = 'Connection open. Speak now!';
            recordButton.classList.add('recording');
            // Start sending audio data
            mediaRecorder.addEventListener('dataavailable', event => {
                if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                    socket.send(event.data);
                }
            });
        };

        socket.onmessage = message => {
            const data = JSON.parse(message.data);
            const transcript = data.channel.alternatives[0].transcript;
            
            if (transcript) {
                if (data.is_final) {
                    // This is a final transcript segment. Append it to our full transcript.
                    finalTranscript += transcript + ' ';
                    transcriptArea.value = finalTranscript;
                } else {
                    // This is an interim result. Show it without adding it to the final transcript yet.
                    transcriptArea.value = finalTranscript + transcript;
                }
            }
        };

        socket.onclose = (event) => {
            console.log('Deepgram connection closed:', event);
            if (event.code === 4000) {
                 statusDiv.textContent = 'Connection closed. Your API Key might be invalid or expired.';
            } else {
                 statusDiv.textContent = 'Connection closed.';
            }
            recordButton.classList.remove('recording');
        };

        socket.onerror = error => {
            console.error('Deepgram connection error:', error);
            statusDiv.textContent = 'An error occurred. Check the console.';
            recordButton.classList.remove('recording');
        };
    };

    const startRecording = async () => {
        try {
            statusDiv.textContent = 'Initializing...';
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            microphone = stream;
            
            connectToDeepgram();
            
            mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorder.start(500); // Send data every 500ms
            isRecording = true;
            recordButton.textContent = 'Stop Listening';
            finalTranscript = ''; // Reset transcript on new recording
            transcriptArea.value = '';
        } catch (error) {
            console.error('Error getting user media:', error);
            statusDiv.textContent = 'Microphone access denied. Please allow it in your browser settings.';
        }
    };

    const stopRecording = () => {
        if (microphone) {
             microphone.getTracks().forEach(track => track.stop());
        }
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        if (socket) {
            socket.close();
        }
        isRecording = false;
        recordButton.textContent = 'Start Listening';
        statusDiv.textContent = 'Ready';
        recordButton.classList.remove('recording');
    };

    recordButton.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });
}); 