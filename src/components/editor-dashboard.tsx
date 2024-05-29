"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/tailwind/ui/resizable"
import {Separator} from "@/components/tailwind/ui/separator"
import {TooltipProvider} from "@/components/tailwind/ui/tooltip"
import Menu from "@/components/tailwind/ui/menu";
import AvatarMenu from "@/components/avatar-menu";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import {Sidebar} from "./siderbar"
import { Skeleton } from "./tailwind/ui/skeleton"
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import {useRouter} from "next/navigation";

interface Props {
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
    userName: undefined
}

export function EditorDashboard({
                         navCollapsedSize = 20,
                     }: Props) {
    const router = useRouter();
    const [user, setUser] = useLocalStorage('user', initialUser);
    // const [token, setToken] = useLocalStorage('token',null);
    // console.log(token)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // console.log(1);
            router.push("/");
        }
    }, []);
    // @ts-ignore
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
                        "min-w-[100px] transition-all duration-300 ease-in-out h-full"
                    )}
                >
                    <div className="flex max-w-screen-lg items-center gap-2 px-4 py-2">
                        {!user ?
                            <>
                                <Skeleton className="h-12 w-12 rounded-full"/>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]"/>
                                </div>
                            </>
                            :
                            <>
                                <AvatarMenu/>
                                <div className="space-y-2 font-bold">
                                    {user.userName}
                                </div>
                            </>
                    }

                    <Menu className="ml-auto"/>
                </div>
                <Separator/>
                <Sidebar className="hidden lg:block"/>
            </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={440} style={{'overflowY': 'scroll'}}>
                            <div className="flex h-full flex-col items-center gap-4 py-4 sm:px-5">
                                <TailwindAdvancedEditor />
                            </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}
