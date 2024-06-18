"use client"

import * as React from "react"
import {useContext, useEffect, useState} from "react"

import {cn} from "@/lib/utils"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/tailwind/ui/resizable"
import {Separator} from "@/components/tailwind/ui/separator"
import {TooltipProvider} from "@/components/tailwind/ui/tooltip"
import Menu from "@/components/tailwind/ui/menu";
import AvatarMenu from "@/components/avatar-menu";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import {Sidebar} from "./siderbar"
import {Skeleton} from "./tailwind/ui/skeleton"
import useLocalStorage from "@/hooks/use-local-storage";
import {PageContext} from "@/context/pageListContext"
import {useToast} from "@/components/tailwind/ui/use-toast";
import {OpenAPI, Page, Service} from "@/api";
import {Button} from "@/components/tailwind/ui/button";

interface Props {
    defaultCollapsed?: boolean
    navCollapsedSize: number
}
const initialValue: Page[] = [];
const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
    userName: undefined
}

export function EditorDashboard({
                         navCollapsedSize = 20,
                     }: Props) {
    const [token, setToken] = useLocalStorage('token', "");
    const [user, setUser] = useLocalStorage('user', {});
    const {toast} = useToast();
    const { getPage } = useContext(PageContext);


    const addNewPage = ()=> {
        if (!user.id) {
            return;
        }
        Service.addUsingPost(user).then(res => {
            if (res.code === 20000) {
                toast({
                    title: "添加成功",
                });
                getPage();
            } else {
                toast({
                    title: "添加失败",
                    variant: "destructive",
                    description: res.message,
                });
            }
        });
    }

    useEffect(() => {
        const getLoginUser = async () => {
            // @ts-ignore
            OpenAPI.TOKEN = token;
            // toast({
            //     variant: "destructive",
            //     title: "未登录",
            // });
            await Service.isLoginUsingGet().then(res => {
                const userId = res.data.id;
                if (userId) {
                    // @ts-ignore
                    Service.getInfoUsingGet(token).then(res => {
                        setUser(res.data)
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
                                <AvatarMenu user={user} />
                                <div className="space-y-2 font-bold">
                                    {user.userName}
                                </div>
                            </>
                    }

                    <Menu className="ml-auto"/>
                </div>
                <Separator/>
                <Sidebar className="hidden lg:block h-full"/>
            </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={440} style={{'overflowY': 'scroll'}}>
                            <div className="flex h-full flex-col items-center gap-4 py-4 sm:px-5">
                                <TailwindAdvancedEditor />
                            </div>
                        <Button onClick={addNewPage} className="absolute rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl top-4 right-8 w-12 h-12">
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="847" width="128" height="128">
                                <path
                                    d="M542.72 153.6v327.68H870.4v61.44h-327.68V870.4H481.28v-327.68H153.6V481.28h327.68V153.6z"
                                    fill="#2c2c2c" p-id="848"></path>
                            </svg>
                        </Button>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}
