import {Input} from "@/components/tailwind/ui/input"
import {Button} from "@/components/tailwind/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/tailwind/ui/popover";
import * as React from "react";
import {useEffect, useState} from "react";
import { Textarea } from "@/components/tailwind/ui/textarea"
import {Service} from "@/api";

export default function KnowledgeDialog() {

    // const { openKnowledge, setOpenKnowledge } = useContext(PageContext);
    const [isAsk, setIsAsk] = useState(0);
    const [askValue, setAskValue] = useState("");
    const [responseValue, setResponseValue] = useState("");
    const handleAsk = async () => {
        await Service.AskKnowledgeBase({question: askValue}).then(res => {
            setResponseValue(res.documents);
        });
    }

    return (
        <Popover>
            <PopoverTrigger onClick={() => setIsAsk(0)} className="rounded-full bg-gray-100 hover:bg-gray-200 shadow-xl m-3 mb-6 flex items-center">
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="35290" width="48" height="48">
                    <path
                        d="M86.016 757.76L40.96 950.272c-4.096 12.288 0 28.672 12.288 40.96 12.288 12.288 24.576 12.288 40.96 8.192L270.336 942.08c73.728 40.96 155.648 65.536 241.664 65.536 270.336 0 491.52-221.184 491.52-491.52s-221.184-491.52-491.52-491.52-491.52 221.184-491.52 491.52c0 81.92 24.576 167.936 65.536 241.664z m466.944-16.384c-4.096 4.096-8.192 8.192-12.288 8.192-4.096 0-12.288 4.096-16.384 4.096-4.096 0-12.288 0-16.384-4.096-4.096-4.096-8.192-4.096-12.288-8.192-4.096-4.096-8.192-8.192-8.192-12.288s-4.096-12.288-4.096-16.384 0-12.288 4.096-16.384c4.096-4.096 4.096-8.192 8.192-12.288 4.096-4.096 8.192-8.192 12.288-8.192 12.288-4.096 20.48-4.096 32.768 0 4.096 0 8.192 4.096 12.288 8.192 8.192 8.192 12.288 16.384 12.288 28.672 0 8.192-4.096 20.48-12.288 28.672z m-28.672-491.52c81.92 0 147.456 65.536 147.456 147.456 0 65.536-45.056 122.88-106.496 139.264v49.152c0 20.48-20.48 40.96-40.96 40.96-24.576 0-40.96-20.48-40.96-40.96v-86.016c0-24.576 16.384-40.96 40.96-40.96 36.864 0 65.536-28.672 65.536-65.536 0-36.864-28.672-65.536-65.536-65.536-36.864 0-65.536 28.672-65.536 65.536 0 20.48-20.48 40.96-40.96 40.96-24.576 0-40.96-20.48-40.96-40.96 0-77.824 65.536-143.36 147.456-143.36z"
                        p-id="35291" data-spm-anchor-id="a313x.collections_detail.0.i1.240d3a81k19FQb"
                        className="selected"></path>
                </svg>
                <span className="ml-2 align-middle inline-block">询问个人知识库</span>
            </PopoverTrigger>
            <PopoverContent key={isAsk}>
                <div>
                    <h2 className="mt-1"><b>询问DocMint</b></h2>
                    <p className="mt-1">在这里你可以询问你的个人知识库</p>
                </div>
                {!isAsk ?
                    <>
                        <Textarea className="mt-2 mb-2" placeholder="输入你要询问的内容:"
                                  value={askValue}
                                  onChange={e => {
                                      setAskValue(e.target.value);
                                  }}
                        />
                        <Button onClick={handleAsk} className="mt-1">提交</Button>
                    </>
                    :
                    <Textarea className="mt-2 mb-2" value={responseValue} />
                }
            </PopoverContent>
        </Popover>
    )
}
