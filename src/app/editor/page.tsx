'use client';

import {useEffect, useState} from "react";
import {OpenAPI, Service} from "@/api";
import {useRouter} from "next/navigation";
import AvatarMenu from "@/components/avatar-menu";
import {EditorDashboard} from "@/components/editor-dashboard";
import {Separator} from "@/components/tailwind/ui/separator";
import * as React from "react";
import {useToast} from "@/components/tailwind/ui/use-toast";

const accounts = [
    {
        label: "Alicia Koch",
        email: "alicia@example.com",
        icon: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Vercel</title>
                <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "Alicia Koch",
        email: "alicia@gmail.com",
        icon: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Gmail</title>
                <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "Alicia Koch",
        email: "alicia@me.com",
        icon: (
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>iCloud</title>
                <path
                    d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
]

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
    const [user, setUser] = useState(initialLoginParams);

    const getLoginUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            OpenAPI.TOKEN = token;
            await Service.isLoginUsingGet().then(res => {
                const userId = res.data.id;
                if (userId) {
                    Service.getInfoUsingGet(token).then(res => {
                        setUser(res.data);
                    });
                } else {
                    toast({
                        variant: "destructive",
                        description: res.message,
                    });
                    router.push("/");
                }
            });
            setUser(user);
        } else {
            toast({
                variant: "destructive",
                description: "token缺失，请重新登录",
            });
            router.push("/");
        }

    }

    useEffect(() => {
        getLoginUser();
    }, []);


    return (
            <div className="hidden flex-col md:flex h-full">
                <EditorDashboard
                    user={user}
                    accounts={accounts}
                    navCollapsedSize={4}
                />
            </div>
    );
}
