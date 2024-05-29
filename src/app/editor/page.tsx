'use client';

import * as React from "react";
import {useEffect, useState} from "react";
import {OpenAPI, Service} from "@/api";
import {useRouter} from "next/navigation";
import {EditorDashboard} from "@/components/editor-dashboard";
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
    useEffect(() => {
        const getLoginUser = () => {
            const token = global.localStorage.getItem('token');
            if (token) {
                OpenAPI.TOKEN = token;
                Service.isLoginUsingGet().then(res => {
                    const userId = res.data.id;
                    if (userId) {
                        Service.getInfoUsingGet(token).then(res => {
                            setUser(res.data);
                            window.localStorage.setItem('user', JSON.stringify(res.data));
                        });

                    } else {
                        toast({
                            variant: "destructive",
                            description: res.message,
                        });
                        router.push("/");
                    }
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "token缺失，请重新登录",
                });
                router.push("/");
            }
        };
        getLoginUser();
    }, []);


    return (
            <div className="hidden flex-col md:flex h-full">
                <EditorDashboard
                    navCollapsedSize={4}
                 />
            </div>
    );
}
