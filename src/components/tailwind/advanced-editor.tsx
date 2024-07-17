"use client";
import {defaultEditorContent} from "@/lib/content";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  type JSONContent,
} from "novel";
import {handleCommandNavigation, ImageResizer} from "novel/extensions";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {defaultExtensions} from "./extensions";
import {ColorSelector} from "./selectors/color-selector";
import {LinkSelector} from "./selectors/link-selector";
import {NodeSelector} from "./selectors/node-selector";
import {Separator} from "./ui/separator";

import {handleImageDrop, handleImagePaste} from "novel/plugins";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import {uploadFn} from "./image-upload";
import {TextButtons} from "./selectors/text-buttons";
import {slashCommand, suggestionItems} from "./slash-command";
import {Page} from "@/api";
import {PageContext} from "@/context/pageListContext";
import useLocalStorage from "@/hooks/use-local-storage";
import {EditorService} from "@/api/services/API";
import "@/app/editor/styles.scss"
import "@/app/editor/styles-table.scss"

const extensions = [...defaultExtensions, slashCommand ];

const initialPage: Page = {
  content: undefined,

};

const TailwindAdvancedEditor = () => {
  const { selectedChange, setSelectedChange, setOpenDrawer } = useContext(PageContext);
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [openOCR, setOpenOCR] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [selectedPage, updateSelectedPage] = useLocalStorage('page', initialPage);

  const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    window.localStorage.setItem("html-content", editor.getHTML());
    window.localStorage.setItem("novel-content", JSON.stringify(json));
    window.localStorage.setItem("markdown", editor.storage.markdown.getMarkdown());
    // const page_json = window.localStorage.getItem('page');
    // if (page_json !== null) {
    //   selectedPage.content = JSON.parse(page_json);
    // }
    selectedPage.content = JSON.stringify(json);
    if (selectedPage != null) {
      EditorService.saveUsingPost(selectedPage);
      window.localStorage.setItem("novel-content", JSON.stringify(json));
    }

    setSaveStatus("Saved");
  }, 500);

  useEffect(() => {
    if (selectedChange == 1)
    {
      const content = window.localStorage.getItem("novel-content");
      if (content) setInitialContent(JSON.parse(content));
      else setInitialContent(defaultEditorContent);
      setSelectedChange(0);
    } else {
      const content = window.localStorage.getItem("novel-content");
      if (content) setInitialContent(JSON.parse(content));
      else setInitialContent(defaultEditorContent);
    }
  }, [selectedChange, setSelectedChange]);

  // 监听 content 的变化，触发子组件的重新渲染
  useEffect(() => {
    setEditorKey(prevKey => prevKey + 1); // 改变子组件的 key 来强制重新渲染
  }, [initialContent]);

  const deletePage = async () => {
    console.log(selectedPage);
    if (selectedPage==null) {
      return;
    }
    EditorService.deleteUsingPost(selectedPage);
    window.location.reload();
  }

  const handleVoiceInput = async () => {
    setOpenDrawer(true);
  }

  if (!initialContent) return null

  // @ts-ignore
  return (
    <div className="relative w-full max-w-screen-lg ">

            <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
              <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
              <div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
                {charsCount} Words
              </div>
            </div>
            <EditorRoot>
              <EditorContent
                  key={editorKey}
                  initialContent={initialContent}
                  extensions={extensions}
                  className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg "
                  editorProps={{
                    handleDOMEvents: {
                      keydown: (_view, event) => handleCommandNavigation(event),
                    },
                    handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
                    handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
                    attributes: {
                      class:
                          "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
                    },
                  }}
                  onUpdate={({editor}) => {
                    debouncedUpdates(editor);
                    setSaveStatus("Unsaved");
                  }}
                  slotAfter={<ImageResizer/>}
              >
                <EditorCommand
                    className="z-50 h-auto max-h-[330px] rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                  <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
                  <EditorCommandList>
                    {suggestionItems.map((item) => (
                        <EditorCommandItem
                            value={item.title}
                            // @ts-ignore
                            onCommand={(val) => item.command(val)}
                            className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                            key={item.title}
                        >
                          <div
                              className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </EditorCommandItem>
                    ))}
                  </EditorCommandList>
                </EditorCommand>

                <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI} openOCR={openOCR} onOpenOCRChange={setOpenOCR}>
                  <Separator orientation="vertical"/>
                  <NodeSelector open={openNode} onOpenChange={setOpenNode}/>
                  <Separator orientation="vertical"/>
                  <LinkSelector open={openLink} onOpenChange={setOpenLink}/>
                  <Separator orientation="vertical"/>
                  <TextButtons/>
                  <Separator orientation="vertical"/>
                  <ColorSelector open={openColor} onOpenChange={setOpenColor}/>
                </GenerativeMenuSwitch>
              </EditorContent>
            </EditorRoot>

    </div>
  );
};

export default TailwindAdvancedEditor;
