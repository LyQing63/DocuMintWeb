'use client';

import {Button} from "@/components/tailwind/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/tailwind/ui/card"
import {Input} from "@/components/tailwind/ui/input"
import {Label} from "@/components/tailwind/ui/label"
import {useImmer} from "use-immer";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {OpenAPI, Service} from "@/api";
import {User} from "@/api/index";
import {useToast} from "@/components/tailwind/ui/use-toast";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/use-local-storage";

const initialLoginParams: User = {
    createTime: '',
    gender: undefined,
    id: undefined,
    isVip: undefined,
    updateTime: '',
    userAccount: '',
    userAvatar: '',
    userName: '',    userRole: '',
    userPassword: '',
};
export function LoginForm() {

    const { toast } = useToast();
    const router = useRouter();
    const [loginParams, updateLoginParams] = useImmer(initialLoginParams);
    const [token, setToken] = useLocalStorage('token', "");
    const [user, setUser] = useLocalStorage('user', {});

    const cookies = new Cookies(null, { path: '/' });

    useEffect(() => {

    }, [user, token])



    const login = () => {
        const res = Service.loginUsingPost(loginParams);
        res.then(async r => {
            if (r.code === 20000) {
                toast({
                    description: "登录成功",
                });
                const token = r.data.token;
                cookies.set("token", token);
                setToken(token);
                OpenAPI.TOKEN = token;
            } else {
                toast({
                    variant: "destructive",
                    title: "登录失败",
                    description: r.message,
                });
            }
        });
    }
        // const token = localStorage.getItem('token');
        if (token) {
            router.push('/editor');
        }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">登录</CardTitle>
        <CardDescription>
          {/*Enter your Account below to login to your account.*/}
        </CardDescription>
      </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="account">用户名</Label>
                <Input id="email" type="account" onChange={(e) => {
                    updateLoginParams(draft => {
                        draft.userAccount = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" onChange={(e) => {
                    updateLoginParams(draft => {
                        draft.userPassword = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Button className="w-full" onClick={login}>登录</Button>
            </div>
            <div className="mt-4 text-center text-sm">
                没有拥有账户?{" "}
                <Link href="/register" className="underline">
                    注册
                </Link>
            </div>
        </CardContent>
    </Card>
  )
}
