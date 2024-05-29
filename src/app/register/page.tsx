'use client';

import {RegisterForm} from "@/components/register";

export default function Page() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 py-4 sm:px-5">
            <RegisterForm />
        </div>
    );
}
