import React, { useState } from 'react';
import { AiService } from "@/api/services/API";
import VoiceDrawer from '@/components/voiceDrawer';

const SearchBar = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await AiService.Ask(question).then((res) => {
            console.log(res);
            setAnswer(res.data);
        });
        setLoading(false);
    };
//   useEffect(() => {
//     if (answer) {
//       const answerElement = document.querySelector('.answer');
//       if (answerElement) {
//         answerElement.classList.add('show');
//       }
//     }
//   }, [answer]);

    return (
        <div>
            <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
                {/* <div className="bg-background rounded-lg border p-6 w-full max-w-2xl">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">Result</h2>
                        <p className="text-muted-foreground">The output of your search or calculation will be displayed here.</p>
                    </div>
                    <Textarea
                    // id={answer}
                    placeholder="Your result will appear here..."
                    className="w-full resize-none rounded-lg border border-input p-4 text-lg leading-relaxed shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                    // value={answer}
                    rows={4}
                    />
                </div>
            </div>
            {/* <div className={`answer absolute w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg mt-2 p-4 transition-all duration-500 ease-in-out transform translate-y-0  ${answer ? 'show' : ''}`}>
                <p id={answer}>{answer}</p>
            </div> */}
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
                    <VoiceDrawer />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
