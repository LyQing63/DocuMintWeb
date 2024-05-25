"use client"

import * as React from "react"
import {Archive, ArchiveX, File, Inbox, Send, Trash2,} from "lucide-react"

import {cn} from "@/lib/utils"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/tailwind/ui/resizable"
import {Separator} from "@/components/tailwind/ui/separator"
import {TooltipProvider} from "@/components/tailwind/ui/tooltip"
import {Nav} from "@/components/doc-nav"
import Menu from "@/components/tailwind/ui/menu";
import AvatarMenu from "@/components/avatar-menu";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import {Label} from "@/components/tailwind/ui/label";
import { Card } from "./tailwind/ui/card"

interface Props {
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    navCollapsedSize: number
    user: unknown
}

export function EditorDashboard({
                         user,
                         navCollapsedSize = 20,
                     }: Props) {

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
                    minSize={15}
                    maxSize={20}
                    className={cn(
                        "min-w-[50px] transition-all duration-300 ease-in-out h-full"
                    )}
                >
                    <div className="flex max-w-screen-lg items-center gap-2 px-4 py-2">
                        {/*<Link href="/docs" className="ml-auto">*/}
                        {/*    <Button variant="ghost">Documentation</Button>*/}
                        {/*</Link>*/}
                        <AvatarMenu user={user}/>
                        <Menu className="ml-auto"/>
                    </div>
                    <Separator/>
                    <Nav
                        links={[
                            {
                                title: "Inbox",
                                label: "128",
                                icon: Inbox,
                                variant: "default",
                            },
                            {
                                title: "Drafts",
                                label: "9",
                                icon: File,
                                variant: "ghost",
                            },
                            {
                                title: "Sent",
                                label: "",
                                icon: Send,
                                variant: "ghost",
                            },
                            {
                                title: "Junk",
                                label: "23",
                                icon: ArchiveX,
                                variant: "ghost",
                            },
                            {
                                title: "Trash",
                                label: "",
                                icon: Trash2,
                                variant: "ghost",
                            },
                            {
                                title: "Archive",
                                label: "",
                                icon: Archive,
                                variant: "ghost",
                            },
                        ]}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={440} style={{ 'overflowY': 'scroll'}}>
                            <div className="flex h-full flex-col items-center gap-4 py-4 sm:px-5">
                                <TailwindAdvancedEditor/>
                            </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}
