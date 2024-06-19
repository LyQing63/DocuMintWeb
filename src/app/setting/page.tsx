"use client"

import {Separator} from "@/components/tailwind/ui/separator";
import {ProfileForm} from "@/app/setting/profile-form";
import useLocalStorage from "@/hooks/use-local-storage";

export default function Setting() {

    // const [user, setUser] = useLocalStorage('user', {});

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">用户</h3>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
