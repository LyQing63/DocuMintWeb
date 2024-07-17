import React from 'react';
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  MessageSquarePlus, Table2Icon,
  Text,
  TextQuote,
  Youtube,
} from "lucide-react";
// import ReactMindMap from 'react-mindmap';
import {Command, createSuggestionItems, renderItems} from "novel/extensions";
import {AiService} from "@/api/services/API";

export const suggestionItems = createSuggestionItems([
  {
    title: "发送反馈",
    description: "让我们知道如何改进。",
    icon: <MessageSquarePlus size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      if (typeof window !== 'undefined') {
        window.open("/feedback", "_blank");
      }
    },
  },
  {
    title: "文本",
    description: "开始输入纯文本。",
    searchTerms: ["p", "paragraph"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
    },
  },
  {
    title: "待办事项列表",
    description: "用待办事项列表跟踪任务。",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "标题 1",
    description: "大节标题。",
    searchTerms: ["title", "big", "large"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "标题 2",
    description: "中节标题。",
    searchTerms: ["subtitle", "medium"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "标题 3",
    description: "小节标题。",
    searchTerms: ["subtitle", "small"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "项目符号列表",
    description: "创建一个简单的项目符号列表。",
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "编号列表",
    description: "创建一个带编号的列表。",
    searchTerms: ["ordered"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "引用",
    description: "捕捉一个引用。",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
  },
  {
    title: "代码",
    description: "捕捉一个代码片段。",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "表格",
    description: "添加一个表格",
    searchTerms: ["table"],
    icon: <Table2Icon size={18} />,
    command: ({ editor, range }) => editor.chain().focus().insertTable({
      rows: 3, cols: 3, withHeaderRow: false
    }).run(),

  },
  {
    title: "图片",
    description: "从您的计算机上传图片。",
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {

      editor.chain().focus().deleteRange(range).run();
      // upload image
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          // const pos = editor.view.state.selection.from;
          AiService.FileUpload(file).then((res) => {
            const url = res.data.data.file;
            console.log(url);
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          });
        }
      };
      input.click();

    },
  },
  {
    title: "OCR",
    description: "从您的计算机上传图片。",
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {

      editor.chain().focus().deleteRange(range).run();
      // upload image
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          // const pos = editor.view.state.selection.from;
          AiService.FileUpload(file).then((res) => {
            const url = res.data.data.file;
            console.log(url);
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          });
        }
      };
      input.click();

    },
  },
  {
    title: "Bilibili",
    description: "嵌入一个Bilibili视频。",
    searchTerms: ["video", "bilibili", "embed"],
    icon: <Youtube size={18} />,
    command: ({ editor, range }) => {
      if (typeof window !== 'undefined') {
        const videoLink = prompt("请输入Bilibili视频链接");
        // Bilibili视频链接的正则表达式
        const bilibiliRegex = new RegExp(
          /^(https?:\/\/)?(www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+)(\/?\?.*)?$/,
        );
        // @ts-ignore
        if (bilibiliRegex.test(videoLink)) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setBilibiliVideo({
              // @ts-ignore
              src: videoLink,
            })
            .run();
        } else {
          if (videoLink !== null) {
            alert("请输入正确的Bilibili视频链接");
          }
        }
      }
    },
  },
  {
    title: "思维导图",
    description: "创建和编辑思维导图。",
    icon: <svg t="1720684618785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3517" width="16" height="16"><path d="M341.333 456.533a55.467 55.467 0 0 1 0 110.934H170.667a55.467 55.467 0 1 1 0-110.934h170.666zM170.667 384a128 128 0 0 0 0 256h170.666a128 128 0 1 0 0-256H170.667z m618.666-140.8a34.133 34.133 0 0 1 0 68.267h-128a34.133 34.133 0 0 1 0-68.267h128z m-128-72.533a106.667 106.667 0 0 0 0 213.333h128a106.667 106.667 0 0 0 0-213.333h-128z" fill="#333333" p-id="3518"></path><path d="M554.667 277.333c0-17.45 4.181-33.92 11.605-48.426-77.44 12.416-147.456 37.077-203.947 70.997-38.613 23.083-72.106 51.499-96.981 84.096h75.99c7.978 0 15.786 0.725 23.338 2.133 10.496-8.32 22.187-16.384 34.987-24.064 43.093-25.898 97.194-46.165 158.378-58.026a106.667 106.667 0 0 1-3.37-26.71zM364.672 637.867A127.657 127.657 0 0 1 341.333 640h-75.946c24.789 32.597 58.325 60.97 96.938 84.139 56.491 33.877 126.507 58.538 203.947 70.997a106.24 106.24 0 0 1-8.235-75.093c-61.184-11.947-115.242-32.214-158.421-58.112-12.8-7.68-24.448-15.702-34.987-24.064z" fill="#333333" p-id="3519"></path><path d="M789.333 712.533a34.133 34.133 0 0 1 0 68.267h-128a34.133 34.133 0 1 1 0-68.267h128z m-128-72.533a106.667 106.667 0 0 0 0 213.333h128a106.667 106.667 0 0 0 0-213.333h-128z" fill="#333333" p-id="3520"></path></svg>,
    command: ({ editor, range }) => {
      // Pass the editor instance to MindMapComponent
      editor.chain().focus().deleteRange(range).insertDrawIo().run();
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
