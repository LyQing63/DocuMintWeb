import React, { useState, useRef, useEffect } from 'react';
import { AiService } from "@/api/services/API";
import VoiceDrawer from '@/components/voiceDrawer';
import io from 'socket.io-client';
import axios from 'axios';

const SearchBar = ({ setAnswer }) => {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const socket = useRef(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const sendInterval = useRef(null);

    useEffect(() => {
        socket.current = io('');

        socket.current.on('connect', () => {
            console.log('Connected to server');
        });

        socket.current.on('recognition_result', data => {
            setQuestion(prevQuestion => prevQuestion + data.result);
        });

        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.current.disconnect();
            clearInterval(sendInterval.current);
        };
    }, []);

    useEffect(() => {
        const handleGlobalClick = () => {
            if (isRecording) {
                stopRecording();
            }
        };

        window.addEventListener('click', handleGlobalClick);

        return () => {
            window.removeEventListener('click', handleGlobalClick);
        };
    }, [isRecording]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.current.push(event.data);
            }
        };

        mediaRecorder.current.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });

            const formData = new FormData();
            formData.append('file', audioFile);

            try {
                const response = await axios.post('/recognize', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setQuestion(prevQuestion => prevQuestion + response.data.result);
            } catch (error) {
                console.error('Error uploading audio:', error);
            }

            audioChunks.current = [];
        };

        mediaRecorder.current.start(1000);

        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
        }
        setIsRecording(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await AiService.Ask(question).then((res) => {
            console.log(res);
            setAnswer(res.data);
        });
        setLoading(false);
    };

    return (
        <div>
            <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="voice-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 lg:w-128 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-500"
                        placeholder="询问AI..."
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <VoiceDrawer onClick={startRecording} onStop={stopRecording} />
                </div>
                <button
                    type="submit"
                    className={`inline-flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'hidden' : ''}`}
                    disabled={loading}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
                {loading && (
                    <div role="status" className="inline-flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-full border border-blue-700">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
