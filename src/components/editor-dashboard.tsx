import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/tailwind/ui/resizable";
import {Separator} from "@/components/tailwind/ui/separator";
import {TooltipProvider} from "@/components/tailwind/ui/tooltip";
import Menu from "@/components/tailwind/ui/menu";
import AvatarMenu from "@/components/avatar-menu";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import Sidebar from "./siderbar";
import {Skeleton} from "./tailwind/ui/skeleton";
import useLocalStorage from "@/hooks/use-local-storage";
import {PageContext} from "@/context/pageListContext";
import {useToast} from "@/components/tailwind/ui/use-toast";
import {Page} from "@/api";
import {UserService} from "@/api/services/API";
import NavigationMenuDemo from '@/components/tailwind/ui/NavigationMenuDemo';
import AddButton from "@/components/AddButton"; // Adjust the import path as necessary

interface Props {
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

const initialValue: Page[] = [];
const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
    userName: undefined
};

export function EditorDashboard({
    navCollapsedSize = 20,
}: Props) {
    const [token, setToken] = useLocalStorage('token', "");
    const [user, setUser] = useLocalStorage('user', {});
    const { toast } = useToast();
    const { getPage } = useContext(PageContext);
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');

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
        if (user) {
            getPage(user);
        }
    }, [user]);

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
                    <AddButton user={user} className="absolute rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl top-4 right-8 w-12 h-12">
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="847" width="128" height="128">
                            <path
                                d="M542.72 153.6v327.68H870.4v61.44h-327.68V870.4H481.28v-327.68H153.6V481.28h327.68V153.6z"
                                fill="#2c2c2c" p-id="848"></path>
                        </svg>
                    </AddButton>
                </ResizablePanel>
            </ResizablePanelGroup>
            <div className="fixed bottom-0 left-1/4 absolute w-1/2 flex justify-center items-center pb-4">

                <NavigationMenuDemo /> {/* Add NavigationMenuDemo here */}

            </div>
        </TooltipProvider>
    );
}
