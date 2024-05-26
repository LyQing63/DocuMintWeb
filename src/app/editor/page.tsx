'use client';

import {useEffect, useState} from "react";
import {OpenAPI, Service} from "@/api";
import {useRouter} from "next/navigation";
import AvatarMenu from "@/components/avatar-menu";
import {EditorDashboard} from "@/components/editor-dashboard";
import {Separator} from "@/components/tailwind/ui/separator";
import * as React from "react";
import {useToast} from "@/components/tailwind/ui/use-toast";

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
                    navCollapsedSize={4}
                />
            </div>
    );
}
