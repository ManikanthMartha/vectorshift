import { DraggableNode } from "./draggableNode";
import { InputIcon } from "./icons/InputIcon";
import { OutputIcon } from "./icons/OutputIcon";
import { TextIcon } from "./icons/TextIcon";
import { LLMIcon } from "./icons/LLMIcon";
import { SubmitButton } from "./submit";

const TOOLBAR_NODES = [
  { type: "customInput", label: "Input", icon: InputIcon },
  { type: "customOutput", label: "Output", icon: OutputIcon },
  { type: "text", label: "Text", icon: TextIcon },
  { type: "llm", label: "LLM", icon: LLMIcon },
];

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-grid">
        {TOOLBAR_NODES.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
      <SubmitButton />
    </div>
  );
};
