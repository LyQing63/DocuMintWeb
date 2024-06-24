import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/tailwind/ui/button"
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./tailwind/ui/accordion";
import {PageContext} from "@/context/pageListContext";
import KnowledgeDialog from "@/components/knowledgeDialog";


const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
}
//@ts-ignore
export function Sidebar({ className }) {
    const [docDisable, setDocDisable] = useState(false);
    const { pages, setSelectedChange, setOpenKnowledge } = useContext(PageContext);

    const handleKnowledgeBase = async () => {
        console.log("向个人知识数据库访问...");
        setOpenKnowledge(true);
    }

    useEffect(() => {
        // console.log(pages);
    }, [pages])

    //@ts-ignore
    const handleClick = (event, page) => {
        window.localStorage.setItem("novel-content", page.content);
        window.localStorage.setItem("page", JSON.stringify(page));
        setSelectedChange(1);
    }

    return (
        <div className={cn("pb-12", className)}>
                <nav className="flex flex-col gap-6 h-full justify-between">
                    {pages ? (
                            <Accordion type="single" collapsible defaultValue="Docs">
                                <AccordionItem value="Docs" className="border-b-0">
                                    <AccordionTrigger
                                        className={cn(
                                            buttonVariants({
                                                size: "sm",
                                                variant: "ghost",
                                            }),
                                            "justify-between",
                                            docDisable && "cursor-not-allowed opacity-80"
                                        )}
                                    >
                                        <div className="flex items-center justify-start">
                                            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                                                Docs
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="ml-7 flex flex-col space-y-1">
                                            {pages?.map((page, i) => (
                                                <Button
                                                    key={`${page}-${i}`}
                                                    variant="ghost"
                                                    className="w-full justify-start font-normal"
                                                    onClick={event => handleClick(event, page)}
                                                >
                                                    <div className='w-5 h-3'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor"
                                                             className="bi bi-text-indent-left mr-2 h-4 w-4"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                                        </svg>
                                                    </div>
                                                    <span>{page.title}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                    ) : (<Button
                        className={cn(
                            buttonVariants({
                                size: "sm",
                                variant: "ghost",
                            }),
                            "justify-start",
                                        docDisable && "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-text-indent-left mr-2 h-4 w-4" viewBox="0 0 16 16">
                                        <path
                                            d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    Docs
                        </Button>)
                        }
                        {/*<Separator />*/}
                        <KnowledgeDialog />
                        {/*<Button className="m-3 mb-6" onClick={handleKnowledgeBase}></Button>*/}
                </nav>
        </div>
    )
}
