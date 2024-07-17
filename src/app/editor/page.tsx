'use client';

import * as React from "react";
import {useEffect, useState} from "react";
import { EditorDashboard } from "@/components/editor-dashboard";
import PageDataProvider from "@/context/pageListContext";
import VoiceDrawer from "@/components/voiceDrawer";
import KnowledgeDialog from "@/components/knowledgeDialog";

const initialLoginParams = {
    createTime: '',
    gender: undefined,
    id: undefined,
    isVip: undefined,
    updateTime: '',
    userAccount: '',
    userAvatar: '',
    userName: '',
    userRole: '',
};

export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isKnowledgeDialogOpen, setIsKnowledgeDialogOpen] = useState(false);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (event.clientX < window.innerWidth / 6) {
                setIsKnowledgeDialogOpen(true);
            } else {
                setIsKnowledgeDialogOpen(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative hidden md:flex h-screen">
            <PageDataProvider>
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'mr-64' : 'mr-0'} flex-grow`}>
                    <EditorDashboard navCollapsedSize={4}/>
                </div>
                <VoiceDrawer/>
            </PageDataProvider>
            <div
                className={`fixed top-0 right-0 h-full bg-gray-800 shadow-lg border border-transparent transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} w-80`}>
                <iframe src="http://localhost:3000" className="w-full h-full"></iframe>
            </div>
            <button
                onClick={toggleSidebar}
                className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l-full shadow-lg transition-transform duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path
                        d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                </svg>
                <span className="sr-only">Toggle Sidebar</span>
            </button>
            <div
                className={`fixed bottom-0 left-0 transition-transform duration-300 ${isKnowledgeDialogOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <KnowledgeDialog/>
            </div>
        </div>
    );
}
