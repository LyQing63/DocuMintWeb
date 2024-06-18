'use client';

import * as React from "react";
import {EditorDashboard} from "@/components/editor-dashboard";
import {
    ContextMenu, ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent, ContextMenuSubTrigger,
    ContextMenuTrigger
} from "@/components/tailwind/ui/context-menu";
import PageDataProvider from "@/context/pageListContext";

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



    return (
            <div className="hidden flex-col md:flex h-screen">
                <PageDataProvider>
                <EditorDashboard
                    navCollapsedSize={4}
                />
                </PageDataProvider>
            </div>
    );
}
