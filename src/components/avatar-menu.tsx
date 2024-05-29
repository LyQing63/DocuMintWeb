import {LifeBuoy, LogOut, Settings} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "./tailwind/ui/button";
import React, {useEffect, useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/tailwind/ui/dropdown-menu"
import {Service} from "@/api";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/tailwind/ui/avatar";
import {useToast} from "@/components/tailwind/ui/use-toast";
import Link from "next/link";
import useLocalStorage from "@/hooks/use-local-storage";

const initialUser = {
  gender: null,
  id: undefined,
  userAvatar: undefined,
  userName: undefined,
}

export default function AvatarMenu() {

  const { theme: currentTheme, setTheme } = useTheme();
  const router = useRouter();

  const [user, setUser] = useLocalStorage('user', initialUser);

  // const user_json = window.localStorage.getItem('user');
  // let user = initialUser;
  // if (user_json !== null) {
  //   user = JSON.parse(user_json);
  // }

  const {toast} = useToast();

  const logout = ()=> {
    const res = Service.logoutUsingPost();
    res.then(r => {
      if (r.code === 20000) {
        localStorage.removeItem('token');
        toast({
          description: "注销成功!",
        });
        router.push('/');
      } else {
        toast({
          variant: "destructive",
          description: r.message,
        });
      }
    });
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user.userAvatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <span>{user.userName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link href="./setting">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
