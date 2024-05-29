'use client';

import * as React from "react";
import {useRouter} from "next/navigation";
import {EditorDashboard} from "@/components/editor-dashboard";
import {useToast} from "@/components/tailwind/ui/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";

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

    const {toast} = useToast();
    const router = useRouter();
    const [user, setUser] = useLocalStorage('user', initialLoginParams);
    // console.log(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps


    return (
            <div className="hidden flex-col md:flex h-full">
                <EditorDashboard
                    navCollapsedSize={4}
                 />
            </div>
    );
}
