"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/tailwind/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/tailwind/ui/form"
import {Input} from "@/components/tailwind/ui/input"
import {useToast} from "@/components/tailwind/ui/use-toast"
import {RadioGroup, RadioGroupItem} from "@/components/tailwind/ui/radio-group";
import {Label} from "@/components/tailwind/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/tailwind/ui/avatar";
import {Service} from "@/api";
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import {useRouter} from "next/navigation";

const profileFormSchema = z.object({
    userName: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    gender: z.string(),
    userAvatar: z.string().url("请输入头像地址"),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.

const initialUser = {
    userName: "",
    gender: null,
    userAvatar: undefined,
    id: undefined,
}

export function ProfileForm() {

    const { toast } = useToast();
    const router = useRouter();

    const [user, setUser] = useLocalStorage('user', initialUser);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {...user, gender: user.gender ? 'woman' : 'man'},
        mode: "onChange",
    });

    useEffect(() => {
        form.setValue("userName", user.userName);
        form.setValue("gender", user.gender ? 'woman' : 'man');
        form.setValue("userAvatar", user.userAvatar);
    }, [user]);

    function onSubmit(data: ProfileFormValues) {
        const newUser = {...data, id: user.id, gender: data.gender === 'man' ? 0 : 1};
        Service.updateUserUsingPost(newUser).then(res => {
            if (res.code === 20000) {
                toast({
                    description: (
                        <p className="font-bold">修改成功</p>
                    ),
                })
                // @ts-ignore
                setUser(newUser);
                window.location.reload();
            } else {
                toast({
                    title: "修改失败",
                    description: res.message,
                })
            }
        });
    }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="your username" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name. It can be your real name or a
                            pseudonym. You can only change this once every 30 days.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Gender</FormLabel>
                        <FormControl>
                                <RadioGroup {...field} className="flex" onValueChange={field.onChange}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="man" id="r1" />
                                        <Label htmlFor="r1">man</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="woman" id="r2" />
                                        <Label htmlFor="r2">woman</Label>
                                    </div>
                                </RadioGroup>
                        </FormControl>
                    <FormDescription>
                        You can manage verified email addresses in your{" "}
                        email settings.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="userAvatar"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                        <Input placeholder="your avatar" {...field} />
                    </FormControl>
                    <FormDescription>
                        <Avatar className="items-center">
                            <AvatarImage src={user.userAvatar} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            /><Button type="submit">Update user</Button>
        </form>
    </Form>
    )
}
