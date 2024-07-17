/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5vxe6aJkDnj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/tailwind/ui/dialog"
import { Button } from "@/components/tailwind/ui/button"
import Link from "next/link"
import {useContext, useState} from "react";
import {useToast} from "@/components/tailwind/ui/use-toast";
import {EditorService} from "@/api/services/API";
import {ToastAction} from "@/components/tailwind/ui/toast";
import {PageContext} from "@/context/pageListContext";
import useLocalStorage from "@/hooks/use-local-storage";

export default function AddButton(props) {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [user, setUser] = useLocalStorage("user", null);
    const { pages, setSelectedChange, setOpenKnowledge } = useContext(PageContext);
    const { toast } = useToast();
    const handleOptionClick = (option) => {
        console.log(user);
        setSelectedOption(option)
        EditorService.addUsingPost(user, option).then(res => {
            console.log(res);
            const page = res.data.data.page;
            toast({
                title: "添加结果",
                description: "添加成功！",
                action: (
                    <ToastAction altText="关闭">关闭</ToastAction>
                ),
            });
            window.localStorage.setItem("novel-content", page.content);
            window.localStorage.setItem("page", JSON.stringify(page));
            setSelectedChange(1);
            setIsOpen(false);
        });

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={props.className}>{props.children}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>新建文档</DialogTitle>
                    <DialogDescription>选择您想要创建的文档类型</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Link
                        onClick={() => handleOptionClick("blank")}
                        href="#"
                        className="group flex items-center justify-between rounded-md bg-background px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        prefetch={false}
                    >
                        <div className="flex items-center gap-4">
                            <FileIcon className="h-6 w-6" />
                            <div>
                                <p className="text-sm font-medium">空白文档</p>
                                <p className="text-sm text-muted-foreground">新建一个空白文档</p>
                            </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 opacity-50" />
                    </Link>
                    <Link
                        onClick={() => handleOptionClick("演讲稿")}
                        href="#"
                        className="group flex items-center justify-between rounded-md bg-background px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        prefetch={false}
                    >
                        <div className="flex items-center gap-4">
                            <PresentationIcon className="h-6 w-6" />
                            <div>
                                <p className="text-sm font-medium">演讲稿</p>
                                <p className="text-sm text-muted-foreground">新建一个演讲稿示例</p>
                            </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 opacity-50" />
                    </Link>
                    <Link
                        onClick={() => handleOptionClick("商业企划书")}
                        href="#"
                        className="group flex items-center justify-between rounded-md bg-background px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        prefetch={false}
                    >
                        <div className="flex items-center gap-4">
                            <BriefcaseIcon className="h-6 w-6" />
                            <div>
                                <p className="text-sm font-medium">商业企划书</p>
                                <p className="text-sm text-muted-foreground">新建一个商业企划书示例</p>
                            </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 opacity-50" />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function BriefcaseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
    )
}


function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


function FileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}


function PresentationIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h20" />
            <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
            <path d="m7 21 5-5 5 5" />
        </svg>
    )
}
