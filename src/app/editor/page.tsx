'use client';

import * as React from "react";
import {useEffect, useState} from "react";
import { EditorDashboard } from "@/components/editor-dashboard";
import PageDataProvider from "@/context/pageListContext";
import VoiceDrawer from "@/components/voiceDrawer";
import KnowledgeDialog from "@/components/knowledgeDialog";
import {driver} from "driver.js";
import "driver.js/dist/driver.css";
import useLocalStorage from "@/hooks/use-local-storage";
import {UserService} from "@/api/services/API";


export default function Page() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isKnowledgeDialogOpen, setIsKnowledgeDialogOpen] = useState(false);
    const [user, setUser] = useLocalStorage('user', {});
    const [token, setToken] = useLocalStorage('token', "");

    const driverObj = driver({
        showProgress: true,
        steps: [
            { popover: { title: '0.开始', description: '欢迎使用Docmint——属于你的文字编辑工具！现在我将带你一步步了解这里~' } },
            { element: '.editor', popover: { title: '1.中间文字编辑页', description: '这是你的文字编辑空间，你可以在这里完成任何编辑工作' } },
            { element: '.left-sidebar', popover: { title: '2.左侧栏', description: '“你的文档将收纳在这里”' } },
            { element: '.knowledge', popover: {title: '3.左侧知识库', description: '这里是你的知识库，鼠标移至左侧，点击这个按钮，开始和你的所有文档聊天', side: "top"} },
            { element: '.question', popover: { title: '4.下侧问答框', description: '所有工具会集成在这里，以及我们的开发文档，你也可以在这里和AI聊天' } },
            { element: '.search', popover: { title: '5.右侧侧栏', description: '点击这里，开始AI搜索，用你最熟悉的方式来浏览互联网吧！' } },
            { element: '.add',
                popover: {
                    title: '6.加号',
                    description: '现在，点击加号，选择一个模板，开始你的第一个文档~',
                    onNextClick: element => {
                        const newUser = user
                        newUser.isNew = 0
                        setUser(newUser)
                        const updateUser = {
                            id: newUser.id,
                            userName: newUser.userName,
                            userAvatar: newUser.userAvatar,
                            gender: newUser.gender,
                            userEmail: newUser.userEmail,
                            isNew: newUser.isNew
                        }
                        UserService.updateUserUsingPost(updateUser)
                        driverObj.moveNext();
                    } } },
        ]
    });

    useEffect(() => {
        const getLoginUser = async () => {
            await UserService.isLoginUsingGet(token).then(res => {
                const userId = res.data.data.id;
                if (userId) {
                    // @ts-ignore
                    UserService.getInfoUsingGet(token).then(res => {
                        setUser(res.data.data)
                    });
                }
            });
        };

        getLoginUser();
    }, [token]);

    useEffect(() => {
        console.log(user)
        if (user.isNew) {
            driverObj.drive()
        }
    }, [user]);

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
                    <EditorDashboard user={user} navCollapsedSize={4}/>
                </div>
                <VoiceDrawer/>
            </PageDataProvider>
            <div
                className={`fixed top-0 right-0 h-full bg-gray-800 shadow-lg border border-transparent transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} w-80`}>
                <iframe src="http://localhost:3000" className="w-full h-full"></iframe>
            </div>
            <button
                onClick={toggleSidebar}
                className="search fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l-full shadow-lg transition-transform duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-caret-left" viewBox="0 0 16 16">
                    <path
                        d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                </svg>
                <span className="sr-only">Toggle Sidebar</span>
            </button>
            <div
                className={`knowledge fixed bottom-0 left-0 transition-transform duration-300 ${isKnowledgeDialogOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <KnowledgeDialog/>
            </div>
        </div>
    );
}
