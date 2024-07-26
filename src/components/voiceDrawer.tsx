import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/tailwind/ui/dialog";
import { Button } from "@/components/tailwind/ui/button";

export default function VoiceDrawer({ onClick, onStop }) {
    const [isRecording, setIsRecording] = useState(false);

    const handleClick = () => {
        if (isRecording) {
            onStop();
        } else {
            onClick();
        }
        setIsRecording(!isRecording);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3" onClick={handleClick}>
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                    </svg>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>语音输入</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-6 py-8">
                    <div className="relative w-16 h-16">
                        <div className=""></div>
                        <div className="">
                            <div className="h-full justify-center flex space-x-1">
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-lg mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-xl mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-3 bg-black animate-bar-scale-lg mr-0.5"></div>
                            </div>
                        </div>
                    </div>
                    <DialogDescription>{isRecording ? '输入中...' : '点击按钮开始录音'}</DialogDescription>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClick}>{isRecording ? '暂停' : '开始'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
