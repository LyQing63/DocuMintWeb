"use client"

import {Separator} from "@/components/tailwind/ui/separator";
import {ProfileForm} from "@/app/setting/profile-form";

export default function Setting() {

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
