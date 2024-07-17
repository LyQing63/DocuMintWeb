import { Input } from "@/components/tailwind/ui/input";
import { Button } from "@/components/tailwind/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/tailwind/ui/popover";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/tailwind/ui/textarea";
import { AiService } from "@/api/services/API";

export default function KnowledgeDialog() {

    const [isAsk, setIsAsk] = useState(0);
    const [askValue, setAskValue] = useState("");
    const [responseValue, setResponseValue] = useState("");
    const responseTextareaRef = useRef(null);

    const handleAsk = async () => {
        await AiService.AskKnowledgeBase({ question: askValue }).then(res => {
            setResponseValue(res.data.data);
            setIsAsk(1);
            setTimeout(() => {
                if (responseTextareaRef.current) {
                    responseTextareaRef.current.style.height = "auto";
                    responseTextareaRef.current.style.height = responseTextareaRef.current.scrollHeight + "px";
                }
            }, 300); // 延迟以便动画效果更明显
        });
    }

    useEffect(() => {
        if (isAsk && responseTextareaRef.current) {
            responseTextareaRef.current.style.height = "auto";
            responseTextareaRef.current.style.height = responseTextareaRef.current.scrollHeight + "px";
        }
    }, [isAsk]);

    return (
        <Popover>
            <PopoverTrigger onClick={() => setIsAsk(0)} className="rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl m-3 mb-6 flex items-center justify-center w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
            </PopoverTrigger>
            <PopoverContent key={isAsk} className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 rounded-lg p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
                {!isAsk ?
                    <>
                        <Textarea className="mt-2 mb-2" placeholder="输入你要询问的内容:"
                            value={askValue}
                            onChange={e => {
                                setAskValue(e.target.value);
                            }}
                        />
                        <Button onClick={handleAsk} className="mt-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">提交</Button>
                    </>
                    :
                    <Textarea ref={responseTextareaRef} className="mt-2 mb-2 transition-all duration-300 ease-in-out font-bold text-lg" value={responseValue} readOnly />
                }
            </PopoverContent>
        </Popover>
    )
}