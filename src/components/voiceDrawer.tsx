import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/tailwind/ui/drawer";
import {Button} from "@/components/tailwind/ui/button";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "@/context/pageListContext";
import {useImmer} from "use-immer";

const defaultData = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]

export default function VoiceDrawer() {

    const { openDrawer, setOpenDrawer } = useContext(PageContext);
    const [update, setUpdate] = useState(0);
    const [data, updateData] = useImmer(defaultData);
    // 更新条状元素的高度
    function updateBars() {
        if (openDrawer) {
            updateData((draft) => {
                    draft.map((item) => {
                        // console.log(item);
                        item.goal = Math.max(0, Math.min(400, item.goal + (Math.random() - 0.5) * 50));
                    })
                }
            );
        }

    }

    useEffect(() => {
        if (!openDrawer) return ;
        if (openDrawer) {
            const interval = setInterval(updateBars, 50);
            return () => clearInterval(interval);
        }
    }, [openDrawer]);

    return (
        <Drawer key={update} open={openDrawer}>
            {/*<DrawerTrigger asChild>*/}
            {/*    <Button variant="outline">Open Drawer</Button>*/}
            {/*</DrawerTrigger>*/}
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>音频输入中...</DrawerTitle>
                        {/*<DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
                    </DrawerHeader>
                    <div className="h-[15vh]"></div>
                        <div className="h-[15vh]">
                            <div className="h-full justify-center flex space-x-1">
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-lg mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-xl mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-sm mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-md mr-0.5"></div>
                                <div className="bar w-2 h-4 bg-black animate-bar-scale-lg mr-0.5"></div>
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button onClick={() => setOpenDrawer(false)}>结束</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
            </DrawerContent>
        </Drawer>
    );
}
