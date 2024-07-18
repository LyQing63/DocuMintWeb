import {Button} from "@/components/tailwind/ui/button"
import * as React from "react";
import {useContext, useEffect, useRef, useState} from "react";
import {PageContext} from "@/context/pageListContext";
import {EditorService, Page} from "@/api/services/API";
import {useToast} from "@/components/tailwind/ui/use-toast";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/tailwind/ui/collapsible"
import {Separator} from "@/components/tailwind/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./tailwind/ui/dropdown-menu";
import {ChevronDown, ChevronLeft, CircleEllipsis} from "lucide-react";

const initialUser = {
    gender: null,
    id: undefined,
    userAvatar: undefined,
}
//@ts-ignore
// export function Sidebar({ className }) {
//     const [docDisable, setDocDisable] = useState(false);
//     const { pages, setSelectedChange, setOpenKnowledge } = useContext(PageContext);
//     const {toast} = useToast();
//
//     useEffect(() => {
//         // console.log(pages);
//     }, [pages])
//
//     //@ts-ignore
//     const handleClick = (event, page) => {
//         window.localStorage.setItem("novel-content", page.content);
//         window.localStorage.setItem("page", JSON.stringify(page));
//         setSelectedChange(1);
//     }
//
//     const handleDelete = (page: Page) => {
//        EditorService.deleteUsingPost(page).then((res) => {
//            toast({
//                description: "删除成功！",
//            })
//            window.location.reload();
//        })
//     }
//
//     return (
//         <div className={cn("pb-12", className)}>
//                 <nav className="flex flex-col gap-6 h-full justify-between">
//                     {pages ? (
//                             <Accordion type="single" collapsible defaultValue="Docs">
//                                 <AccordionItem value="Docs" className="border-b-0">
//                                     <AccordionTrigger
//                                         className={cn(
//                                             buttonVariants({
//                                                 size: "sm",
//                                                 variant: "ghost",
//                                             }),
//                                             "justify-between",
//                                             docDisable && "cursor-not-allowed opacity-80",
//                                             "shadow-inner"
//                                         )}
//                                     >
//                                         <div className="flex items-center justify-start">
//                                             <svg t="1720431361126" className="icon" viewBox="0 0 1024 1024"
//                                                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4584" width="16"
//                                                  height="16">
//                                                 <path
//                                                     d="M962.624 992 61.44 992C27.52 992 0 964.032 0 929.408L0 632c0.576 0 1.024 0 1.6 0L180.224 32l663.552 0 178.624 600c0.576 0 1.088 0 1.536 0l0 297.408C1024 964.032 996.48 992 962.624 992zM765.44 94.656 256 94.656 104.96 616.384l174.08 0 98.944 187.456L640 803.84l94.72-187.456 187.776 0L765.44 94.656zM256.896 491.136l510.208 0 11.712 41.728L245.248 532.864 256.896 491.136zM286.144 386.816l451.776 0 11.712 41.728L274.496 428.544 286.144 386.816zM315.392 282.432l393.28 0 11.712 41.728-416.64 0L315.392 282.432zM344.576 178.112l334.848 0 11.712 41.728L332.864 219.84 344.576 178.112z"
//                                                     fill="#040000" p-id="4585"></path>
//                                             </svg>
//                                             <h2 className="relative px-1 text-lg font-semibold tracking-tight">
//                                                 目录
//                                             </h2>
//                                         </div>
//                                     </AccordionTrigger>
//                                     <AccordionContent>
//                                         <div className="ml-2 flex flex-col space-y-1">
//                                             {pages?.map((page, i) => (
//                                                 <div className="flex w-full shrink-0 justify-center items-center"
//                                                      key={`${page}-${i}`}>
//                                                     <Button
//                                                         variant="ghost"
//                                                         className="w-4/5 justify-start font-normal"
//                                                         onClick={event => handleClick(event, page)}
//                                                     >
//                                                         <div className='w-5 h-3'>
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="16"
//                                                                  height="16"
//                                                                  fill="currentColor"
//                                                                  className="bi bi-text-indent-left mr-2 h-4 w-4"
//                                                                  viewBox="0 0 16 16">
//                                                                 <path
//                                                                     d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
//                                                             </svg>
//                                                         </div>
//                                                         <span className="truncate ...">{page.title}</span>
//                                                     </Button>
//                                                     <Popover>
//                                                         <PopoverTrigger>
//                                                             <button
//                                                                 className="w-6 h-6 hover:bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
//                                                                 <svg t="1720432947460" className="icon"
//                                                                      viewBox="0 0 1024 1024" version="1.1"
//                                                                      xmlns="http://www.w3.org/2000/svg" p-id="7623"
//                                                                      width="16" height="16">
//                                                                     <path
//                                                                         d="M64 512c0-31.44 10.92-58.07 32.75-79.91 21.83-21.83 48.47-32.75 79.9-32.75 31.44 0 58.08 10.92 79.91 32.75s32.75 48.47 32.75 79.91-10.92 58.07-32.75 79.91c-21.83 21.83-48.47 32.75-79.91 32.75-31.44 0-58.07-10.91-79.9-32.75C74.92 570.07 64 543.44 64 512z m335.35 0c0-31.44 10.91-58.07 32.75-79.91 21.83-21.83 48.47-32.75 79.91-32.75 31.44 0 58.07 10.92 79.91 32.75 21.83 21.83 32.75 48.47 32.75 79.91s-10.92 58.07-32.75 79.91c-21.83 21.83-48.47 32.75-79.91 32.75-31.44 0-58.07-10.91-79.91-32.75-21.84-21.84-32.75-48.47-32.75-79.91z m335.34 0c0-31.44 10.92-58.07 32.75-79.91 21.83-21.83 48.47-32.75 79.91-32.75s58.07 10.92 79.91 32.75C949.09 453.93 960 480.56 960 512s-10.91 58.07-32.75 79.91-48.47 32.75-79.91 32.75-58.07-10.91-79.91-32.75c-21.82-21.84-32.74-48.47-32.74-79.91z"
//                                                                         p-id="7624"></path>
//                                                                 </svg>
//                                                             </button>
//                                                         </PopoverTrigger>
//                                                         <PopoverContent
//                                                             className="flex-col w-10 items-center justify-center">
//                                                             <div>
//                                                                 <button
//                                                                     className="w-6 h-6 -ml-2 hover:bg-red-500 rounded-lg flex items-center justify-center shadow-md"
//                                                                     onClick={() => handleDelete(page)}
//                                                                 >
//                                                                     <svg t="1720429466260" className="icon"
//                                                                          viewBox="0 0 1024 1024"
//                                                                          version="1.1"
//                                                                          xmlns="http://www.w3.org/2000/svg"
//                                                                          p-id="2665" width="16" height="16">
//                                                                         <path
//                                                                             d="M853.333333 192v42.666667a21.333333 21.333333 0 0 1-21.333333 21.333333h-640a21.333333 21.333333 0 0 1-21.333333-21.333333v-42.666667a21.333333 21.333333 0 0 1 21.333333-21.333333H384V128a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v42.666667h192a21.333333 21.333333 0 0 1 21.333333 21.333333zM250.453333 859.306667a85.333333 85.333333 0 0 0 85.333334 79.36h353.28a85.333333 85.333333 0 0 0 85.333333-79.36L810.666667 341.333333H213.333333z"
//                                                                             p-id="2666"></path>
//                                                                     </svg>
//                                                                 </button>
//                                                             </div>
//                                                         </PopoverContent>
//                                                     </Popover>
//
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </AccordionContent>
//                                 </AccordionItem>
//                             </Accordion>
//                     ) : (<Button
//                         className={cn(
//                             buttonVariants({
//                                 size: "sm",
//                                 variant: "ghost",
//                             }),
//                             "justify-start",
//                             docDisable && "cursor-not-allowed opacity-80"
//                         )}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//                              className="bi bi-text-indent-left mr-2 h-4 w-4" viewBox="0 0 16 16">
//                             <path
//                                 d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
//                         </svg>
//                         目录
//                     </Button>)
//                     }
//                     {/*<Separator />*/}
//                     <KnowledgeDialog/>
//                     {/*<Button className="m-3 mb-6" onClick={handleKnowledgeBase}></Button>*/}
//                 </nav>
//         </div>
//     )
// }

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/J3WLFMjfJG1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Sidebar({ user }) {
    // const [docDisable, setDocDisable] = useState(false);
    const { pages, getPage, setSelectedChange, setOpenKnowledge } = useContext(PageContext);
    const [selectedItem, setSelectedItem] = useState(null)
    const {toast} = useToast();
    const [pageOpen, setPageOpen] = useState(true);
    const [favOpen, setFavOpen] = useState(false);
    const [recOpen, setRecOpen] = useState(false);
    const [trashOpen, setTrashOpen] = useState(false);
    const [rename, setRename] = useState(false);
    const [renameId, setRenameId] = useState(null);
    const inputRef = useRef(null);
    const [renameValue, setRenameValue] = useState("");

    useEffect(() => {
        if (rename && inputRef.current) {
            inputRef.current.focus();
        }
    }, [rename]);

    //@ts-ignore
    const handleClick = (event, page, i) => {
        if (i === selectedItem) {
            return;
        }
        setRenameValue(page.title);
        setSelectedItem(i);
        window.localStorage.setItem("novel-content", page.content);
        window.localStorage.setItem("page", JSON.stringify(page));
        setSelectedChange(1);
    }

    const handleDelete = (page: Page) => {
        EditorService.deleteUsingPost(page).then((res) => {
            toast({
                description: "删除成功！",
            })
            getPage(user);
            setSelectedItem(0);
            const newPage = pages[0];
            window.localStorage.setItem("novel-content", newPage.content);
            window.localStorage.setItem("page", JSON.stringify(newPage));
            setSelectedChange(1);
        })
    }

    const getInput = (e, page, newTitle) => {
        if (e.key == 'Enter') {
            //输入回车后的一些操作
            if (page.title !== newTitle) {
                updateTile(page, newTitle);
            }
            console.log("修改成功");
            setRename(false);
        }
    }

    const updateTile = (page, newTitle) => {
        page.title = newTitle;
        EditorService.saveUsingPost(page).then(() => {
            getPage(user);
            window.localStorage.setItem("page", JSON.stringify(page));
            setSelectedChange(1);
        });
    }

    const handleRenameChange = (e) => {
        setRenameValue(e.target.value);
    }

    // @ts-ignore
    return (
        <div className="left-sidebar flex flex-col w-full max-w-3xl mx-auto h-auto ">
            <Collapsible className="rounded-lg overflow-hidden" open={pageOpen} onOpenChange={setPageOpen}>
                <CollapsibleTrigger
                    className="flex w-full items-center justify-between font-medium px-6 py-4 hover:bg-primary/10 hover:border-primary">
                    <div className="flex items-center">
                        <svg t="1720950298774" className="icon" viewBox="0 0 1639 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="3209" width="24" height="24">
                            <path
                                d="M0 102.4C0 45.846047 45.451756 0 102.4 0 158.953953 0 204.8 45.451756 204.8 102.4 204.8 158.953953 159.348244 204.8 102.4 204.8 45.846047 204.8 0 159.348244 0 102.4ZM409.6 102.4C409.6 45.846047 456.269926 0 512.253266 0L1535.746734 0C1592.440566 0 1638.4 45.451756 1638.4 102.4 1638.4 158.953953 1591.730074 204.8 1535.746734 204.8L512.253266 204.8C455.559434 204.8 409.6 159.348244 409.6 102.4ZM0 512C0 455.446047 45.451756 409.6 102.4 409.6 158.953953 409.6 204.8 455.051756 204.8 512 204.8 568.553953 159.348244 614.4 102.4 614.4 45.846047 614.4 0 568.948244 0 512ZM409.6 512C409.6 455.446047 456.269926 409.6 512.253266 409.6L1535.746734 409.6C1592.440566 409.6 1638.4 455.051756 1638.4 512 1638.4 568.553953 1591.730074 614.4 1535.746734 614.4L512.253266 614.4C455.559434 614.4 409.6 568.948244 409.6 512ZM0 921.6C0 865.046047 45.451756 819.2 102.4 819.2 158.953953 819.2 204.8 864.651756 204.8 921.6 204.8 978.153953 159.348244 1024 102.4 1024 45.846047 1024 0 978.548244 0 921.6ZM409.6 921.6C409.6 865.046047 456.269926 819.2 512.253266 819.2L1535.746734 819.2C1592.440566 819.2 1638.4 864.651756 1638.4 921.6 1638.4 978.153953 1591.730074 1024 1535.746734 1024L512.253266 1024C455.559434 1024 409.6 978.548244 409.6 921.6Z"
                                fill="#272636" p-id="3210"></path>
                        </svg>
                        <h3 className="ml-3">文档</h3>
                    </div>
                    {pageOpen ?
                        <ChevronDown className="w-5 h-5" /> :
                        <ChevronLeft className="w-5 h-5"/>
                    }
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-auto px-3">
                    <div className="grid ml-6">
                        {pages?.map((page, i) => (
                            <div key={i}
                                 className=
                                     {`grid mt-1 rounded-md gap-2 hover:bg-primary/10 hover:border-primary ${
                                         selectedItem === i ? "bg-primary/10 border-primary" : ""
                                     }`}
                                 onClick={event => handleClick(event, page, i)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center ml-3">
                                        {
                                            rename && (i === renameId) ?
                                                <input type="text" ref={inputRef} value={renameValue}
                                                       onChange={handleRenameChange}
                                                       onKeyDown={(e) => getInput(e, page, renameValue)}
                                                       onBlur={() => {
                                                           if (page.title !== renameValue) {
                                                               updateTile(page, renameValue);
                                                           }
                                                           setRename(false);
                                                       }} /> :
                                                <h4 className="font-medium truncate">{page.title}</h4>
                                        }
                                </div>
                                    <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-muted-foreground">
                                                    <CircleEllipsis className="w-5 h-5" />
                                                    <span className="sr-only">更多</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <button className="flex items-center">
                                                        <StarIcon className="w-5 h-5 mr-2"/>
                                                        收藏
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <button className="flex items-center" onClick={() => {
                                                        setRename(true);
                                                        setRenameId(i);
                                                    }}>
                                                        <PencilIcon className="w-5 h-5 mr-2" />
                                                        重命名
                                                    </button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <button className="flex items-center" onClick={() => handleDelete(page)}>
                                                        <TrashIcon className="w-5 h-5 mr-2"/>
                                                        删除
                                                    </button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                            ))}

                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Separator className="mb-3 mt-3" />
            <Collapsible className="rounded-lg overflow-hidden" open={recOpen} onOpenChange={setRecOpen}>
                <CollapsibleTrigger
                    className="flex w-full items-center justify-between bg-accent text-accent-foreground font-medium px-6 py-4 hover:bg-primary/10 hover:border-primary">
                    <div className="flex items-center">
                        <svg t="1720951021955" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="4400" width="24" height="24">
                            <path
                                d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                                fill="#575B66" p-id="4401"></path>
                            <path
                                d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                                fill="#575B66" p-id="4402"></path>
                        </svg>
                        <h3 className="ml-3">最近编写</h3>
                    </div>
                    {recOpen ?
                        <ChevronDown className="w-5 h-5" /> :
                        <ChevronLeft className="w-5 h-5"/>
                    }
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 border-t">

                </CollapsibleContent>
            </Collapsible>
            <Collapsible className="border rounded-lg overflow-hidden " open={favOpen} onOpenChange={setFavOpen}>
                <CollapsibleTrigger
                    className="flex w-full items-center justify-between bg-secondary text-secondary-foreground font-medium px-6 py-4 hover:bg-primary/10 hover:border-primary">
                    <div className="flex items-center">
                        <svg t="1720951087569" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="5675" width="24" height="24">
                            <path
                                d="M587.6224 843.997867l172.561067 61.371733c12.8 4.539733 17.134933 1.399467 16.776533-12.1856l-5.034667-183.074133c-1.262933-45.397333 19.029333-107.861333 46.728534-143.872l111.684266-145.134934c8.277333-10.752 6.638933-15.872-6.4-19.712l-175.6672-51.780266c-43.554133-12.834133-96.682667-51.421867-122.368-88.917334l-103.543466-151.074133c-7.68-11.195733-13.038933-11.195733-20.718934 0l-103.543466 151.074133c-25.6512 37.461333-78.779733 76.066133-122.368 88.917334L100.061867 401.390933c-13.021867 3.84-14.677333 8.942933-6.4 19.712l111.684266 145.152c27.682133 35.976533 47.991467 98.423467 46.728534 143.854934l-5.034667 183.074133c-0.3584 13.568 3.976533 16.725333 16.776533 12.1856l172.544-61.371733c42.786133-15.2064 108.458667-15.223467 151.261867 0z m-22.869333 64.324266c-28.0064-9.966933-77.533867-9.949867-105.506134 0l-172.561066 61.354667c-58.026667 20.650667-109.568-16.878933-107.8784-78.370133l5.034666-183.074134c0.8192-29.730133-14.506667-76.8-32.597333-100.352l-111.684267-145.152c-37.546667-48.810667-17.800533-109.431467 41.198934-126.805333l175.6672-51.797333c28.5184-8.413867 68.573867-37.512533 85.367466-62.020267l103.543467-151.074133c34.816-50.7904 98.56-50.7392 133.3248 0l103.543467 151.074133c16.810667 24.5248 56.8832 53.623467 85.367466 62.020267l175.6672 51.780266c59.067733 17.408 78.711467 78.062933 41.198934 126.805334l-111.684267 145.169066c-18.1248 23.552-33.416533 70.656-32.597333 100.352l5.034666 183.074134c1.706667 61.559467-49.92 98.986667-107.861333 78.370133L564.736 908.322133z"
                                fill="#2B2B2B" p-id="5676"></path>
                            <path
                                d="M518.178133 360.9088a34.133333 34.133333 0 1 1 55.9104-39.150933l43.639467 62.344533a34.133333 34.133333 0 0 0 21.8624 13.994667l66.2528 12.049066a34.133333 34.133333 0 1 1-12.219733 67.1744l-66.2528-12.049066a102.4 102.4 0 0 1-65.570134-42.018134l-43.6224-62.344533z"
                                fill="#D5AC86" p-id="5677"></path>
                        </svg>
                        <h3 className="ml-3">收藏夹</h3>
                    </div>
                    {favOpen ?
                        <ChevronDown className="w-5 h-5" /> :
                        <ChevronLeft className="w-5 h-5"/>
                    }
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 border-t">

                </CollapsibleContent>
            </Collapsible>
            <Collapsible className="border rounded-lg overflow-hidden" open={trashOpen} onOpenChange={setTrashOpen}>
                <CollapsibleTrigger
                    className="flex w-full items-center justify-between bg-muted text-muted-foreground font-medium px-6 py-4 hover:bg-primary/10 hover:border-primary">

                    <div className="flex items-center">
                        <svg t="1720951130678" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="8565" width="24" height="24">
                            <path
                                d="M815.2 273H645.1V167.7c0-21.9-17.8-39.7-39.7-39.7H418.6c-21.9 0-39.7 17.8-39.7 39.7V273H208.8c-14 0-25.3 11.3-25.3 25.3s11.3 25.3 25.3 25.3h606.5c14 0 25.3-11.3 25.3-25.3-0.1-14-11.4-25.3-25.4-25.3z m-385.7 0v-94.4h164.9V273H429.5zM726.4 383.1c-14 0-25.3 11.3-25.3 25.3v437H322.9v-437c0-14-11.3-25.3-25.3-25.3s-25.3 11.3-25.3 25.3v447.1c0 22.3 18.6 40.5 41.5 40.5h396.6c22.9 0 41.5-18.2 41.5-40.5V408.4c-0.2-14-11.5-25.3-25.5-25.3z"
                                fill="#040000" p-id="8566"></path>
                            <path
                                d="M469.8 739.9V408.4c0-14-11.3-25.3-25.3-25.3s-25.3 11.3-25.3 25.3v331.5c0 14 11.3 25.3 25.3 25.3s25.3-11.3 25.3-25.3zM604.8 739.9V408.4c0-14-11.3-25.3-25.3-25.3s-25.3 11.3-25.3 25.3v331.5c0 14 11.3 25.3 25.3 25.3s25.3-11.3 25.3-25.3z"
                                fill="#040000" p-id="8567"></path>
                        </svg>
                        <h3 className="ml-3">回收站</h3>
                    </div>
                    {trashOpen ?
                        <ChevronDown className="w-5 h-5" /> :
                        <ChevronLeft className="w-5 h-5"/>
                    }
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 border-t">

                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}


function StarIcon(props) {
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
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}


function TrashIcon(props) {
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}

function PencilIcon(props) {
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
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    )
}
