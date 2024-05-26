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
import useLocalStorage from "@/hooks/use-local-storage";
import {useEffect} from "react";


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
    const login = () => {
        const res = Service.loginUsingPost(loginParams);
        res.then(async r => {
            if (r.code === 20000) {
                toast({
                    description: "登录成功",
                });
                const token = r.data.token;
                localStorage.setItem('token', token);
                OpenAPI.TOKEN = token;
                router.push('/editor');
            } else {
                toast({
                    variant: "destructive",
                    title: "登录失败",
                    description: r.message,
                });
            }
        });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            toast({
                description: "您已登录",
            });
            router.push('/editor');
        }
    }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your Account below to login to your account.
        </CardDescription>
      </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="account">Account</Label>
                <Input id="email" type="account" onChange={(e) => {
                    updateLoginParams(draft => {
                        draft.userAccount = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => {
                    updateLoginParams(draft => {
                        draft.userPassword = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Button className="w-full" onClick={login}>Sign in</Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                    Sign up
                </Link>
            </div>
        </CardContent>
    </Card>
  )
}
