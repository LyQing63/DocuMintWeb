
import { ArrowDownWideNarrow, CheckCheck, RefreshCcwDot, StepForward, WrapText } from "lucide-react";
import { useEditor } from "novel";
import { getPrevText } from "novel/utils";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";

const options = [
  {
    value: "improve",
    label: "优化句子",
    icon: RefreshCcwDot,
  },

  {
    value: "fix",
    label: "语法修正",
    icon: CheckCheck,
  },
  {
    value: "shorter",
    label: "规范格式",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "详写",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="编辑或审查选择">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              // @ts-ignore
                const slice = editor.state.selection.content();
              // @ts-ignore
                const text = editor.storage.markdown.serializer.serialize(slice.content);
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="使用AI做更多工作">
        <CommandItem
          onSelect={() => {
            // @ts-ignore
              const pos = editor.state.selection.from;

            // @ts-ignore
              const text = getPrevText(editor, pos);
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          续写
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;