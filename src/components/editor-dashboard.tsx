import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/tailwind/ui/resizable";
import { Separator } from "@/components/tailwind/ui/separator";
import { TooltipProvider } from "@/components/tailwind/ui/tooltip";
import Menu from "@/components/tailwind/ui/menu";
import AvatarMenu from "@/components/avatar-menu";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import Sidebar from "./siderbar";
import { Skeleton } from "./tailwind/ui/skeleton";
import useLocalStorage from "@/hooks/use-local-storage";
import { PageContext } from "@/context/pageListContext";
import { useToast } from "@/components/tailwind/ui/use-toast";
import { Page, User } from "@/api";
import { UserService } from "@/api/services/API";
import NavigationMenuDemo from '@/components/tailwind/ui/NavigationMenuDemo';
import AddButton from "@/components/AddButton"; // Adjust the import path as necessary

interface Props {
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
    user: unknown
}

const initialValue: Page[] = [];
const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
    userName: undefined,
    isNew: undefined
};

export function EditorDashboard({
                                    user,
                                    navCollapsedSize = 20,
                                }: Props) {

    const { toast } = useToast();
    const { getPage } = useContext(PageContext);
    const [answer, setAnswer] = useState('');
    const [displayedAnswer, setDisplayedAnswer] = useState('');
    const [question, setQuestion] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });
        const data = await response.json();
        setAnswer(data.answer);
    };

    useEffect(() => {
        if (user) {
            getPage(user);
        }
    }, [user]);

    useEffect(() => {
        let index = 0;
        setDisplayedAnswer('');
        if (answer) {
            const interval = setInterval(() => {
                setDisplayedAnswer((prev) => prev + answer[index]);
                index++;
                if (index === answer.length) {
                    clearInterval(interval);
                }
            }, 50); // 逐字显示的速度，可根据需要调整
            return () => clearInterval(interval);
        }
    }, [answer]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientY } = event;
            const windowHeight = window.innerHeight;
            if (clientY > windowHeight * 2 / 3) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-screen items-stretch"
            >
                <ResizablePanel
                    defaultSize={265}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={10}
                    maxSize={15}
                    className={cn(
                        "min-w-[100px] transition-all duration-300 ease-in-out max-h-screen overflow-auto"
                    )}
                >
                    <div className="flex max-w-screen-lg items-center gap-2 px-4 py-2">
                        {!user ?
                            <>
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                </div>
                            </>
                            :
                            <>
                                <AvatarMenu user={user} />
                                <div className="space-y-2 font-bold">
                                    {user.userName}
                                </div>
                            </>
                        }
                        <Menu className="ml-auto" />
                    </div>
                    <Separator />
                    <Sidebar user={user} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={440} style={{ 'overflowY': 'scroll' }}>
                    <div className="flex h-full flex-col items-center gap-4 py-4 sm:px-5">
                        <TailwindAdvancedEditor />
                    </div>
                    <AddButton user={user} className="add absolute rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl top-4 right-8 w-12 h-12">
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="847" width="128" height="128">
                            <path
                                d="M542.72 153.6v327.68H870.4v61.44h-327.68V870.4H481.28v-327.68H153.6V481.28h327.68V153.6z"
                                fill="#2c2c2c" p-id="848"></path>
                        </svg>
                    </AddButton>
                </ResizablePanel>
            </ResizablePanelGroup>
            {displayedAnswer && (
                <div className={`fixed left-1/4 w-1/2 flex justify-center items-center transition-transform duration-300 ease-in-out ${isVisible ? 'bottom-20' : 'bottom-0'}`}>
                    <div className="flex items-start gap-2.5">
                        {/*<img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="docmint image" />*/}
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">Docmint</span>
                                {/*<span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>*/}
                            </div>
                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{displayedAnswer}</p>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                        </div>
                        <button onClick={() => setAnswer('')} className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <div className={`fixed bottom-0 left-1/4 w-1/2 flex justify-center items-center pb-4 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                <NavigationMenuDemo setAnswer={setAnswer} />
            </div>
        </TooltipProvider>
    );
}
