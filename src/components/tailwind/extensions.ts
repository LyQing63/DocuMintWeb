import {
  AIHighlight,
  CharacterCount,
  CodeBlockLowlight,
  GlobalDragHandle,
  HorizontalRule,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  Youtube,
} from "novel/extensions";
import {UploadImagesPlugin} from "novel/plugins";
import drawIoExtension from '@rcode-link/tiptap-drawio';
import {cx} from "class-variance-authority";
import {common, createLowlight} from "lowlight";
import img from "@/components/tailwind/img";
import {Markdown} from 'tiptap-markdown';
import {Table} from "@/app/editor/extensions/extension-table";
import {TableCellBackground} from "@/app/editor/extensions/extension-table-cell-background";
import {TableHeader} from "@/app/editor/extensions/extension-table-header";
import {TableRow} from "@/app/editor/extensions/extension-table-row";
import {TableCell} from "@/app/editor/extensions/extension-table-cell";


//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
  // common: covers 37 language grammars which should be good enough in most cases
  lowlight: createLowlight(common),
});

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
  inline: false,
});

const characterCount = CharacterCount.configure();

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  youtube,
  // characterCount,
  GlobalDragHandle,
  drawIoExtension.configure({
    openDialog: 'dblclick',
    drawIoLink: "https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&modified=unsavedChanges&proto=json",
    baseImage: img,
  }),
  Markdown.configure({
    html: true,                  // Allow HTML input/output
    tightLists: true,            // No <p> inside <li> in markdown output
    tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: '-',       // <li> prefix in markdown output
    linkify: false,              // Create links from "https://..." text
    breaks: false,               // New lines (\n) in markdown input are converted to <br>
    transformPastedText: false,  // Allow to paste markdown text in the editor
    transformCopiedText: false,  // Copied text is transformed to markdown
  }),
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
  }),
  TableHeader,
  TableRow,
  TableCell,
  TableCellBackground,
];
