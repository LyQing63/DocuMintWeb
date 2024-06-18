'use client';

import {Button} from "@/components/tailwind/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/tailwind/ui/card"
import {Input} from "@/components/tailwind/ui/input"
import {Label} from "@/components/tailwind/ui/label"
import {useImmer} from "use-immer";
import {Service} from "@/api";
import {useRouter} from "next/navigation";
import { useToast } from "@/components/tailwind/ui/use-toast"


const initialRegisterParams = { userAccount: '', userPassword: '', checkPassword: ''};

export function RegisterForm() {
    const { toast } = useToast()
    const router = useRouter();
    const [registerParams, updateRegisterParams] = useImmer(initialRegisterParams);

    const register = () => {
        const res = Service.registerUsingPost(registerParams);
        res.then(r => {
            if (r.code === 20000) {
                 toast({
                    title: "注册成功!",
                    description: "跳转至登录页面",
                });
                router.push("/");
            } else {
                toast({
                    variant: "destructive",
                    title: "注册失败!",
                    description: r.message,
                });
            }
        });
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">注册</CardTitle>
        <CardDescription>
          {/*Enter your email below to login to your account.*/}
        </CardDescription>
      </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="account">用户名</Label>
                <Input id="email" type="account" onChange={(e) => {
                    updateRegisterParams(draft => {
                        draft.userAccount = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" onChange={(e) => {
                    updateRegisterParams(draft => {
                        draft.userPassword = e.target.value;
                    })
                }} required/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">确认密码</Label>
                <Input id="password" type="password" onChange={(e) => {
                    updateRegisterParams(draft => {
                        draft.checkPassword = e.target.value;
                    })
                }} required/>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={register}>注册</Button>
        </CardFooter>
    </Card>
  )
}
