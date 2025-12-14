import { DraggableNode } from "./draggableNode";
import { InputIcon } from "./icons/InputIcon";
import { OutputIcon } from "./icons/OutputIcon";
import { TextIcon } from "./icons/TextIcon";
import { LLMIcon } from "./icons/LLMIcon";
import { ImageIcon } from "./icons/ImageIcon";
import { APIIcon } from "./icons/APIIcon";
import { SubmitButton } from "./submit";
import { TranslateIcon } from "./icons/TranslateIcon";
import { EmailIcon } from "./icons/EmailIcon";

const TOOLBAR_NODES = [
  { type: "customInput", label: "Input", icon: InputIcon },
  { type: "customOutput", label: "Output", icon: OutputIcon },
  { type: "text", label: "Text", icon: TextIcon },
  { type: "llm", label: "LLM", icon: LLMIcon },
  { type: "image", label: "Image", icon: ImageIcon },
  { type: "api", label: "API", icon: APIIcon },
  { type: "translator", label: "Translator", icon: TranslateIcon },
  { type: "list", label: "List", icon: TextIcon },
  { type: "emailValidation", label: "Email", icon: EmailIcon },
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
