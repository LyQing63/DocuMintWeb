'use client';

import * as React from "react";
import {EditorDashboard} from "@/components/editor-dashboard";
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


    return (
            <div className="hidden flex-col md:flex h-screen">
                <PageDataProvider>
                    <EditorDashboard
                        navCollapsedSize={4}
                    />
                    <VoiceDrawer />
                </PageDataProvider>
            </div>
    );
}
