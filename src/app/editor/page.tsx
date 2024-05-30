'use client';

import * as React from "react";
import {EditorDashboard} from "@/components/editor-dashboard";

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
            <div className="hidden flex-col md:flex h-full">
                <EditorDashboard
                    navCollapsedSize={4}
                 />
            </div>
    );
}
