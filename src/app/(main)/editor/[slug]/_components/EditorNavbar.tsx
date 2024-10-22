import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Eye,
  ChevronLeft,
  Laptop,
  Smartphone,
  Tablet,
  Undo,
  Redo,
  Save,
  EyeClosed,
} from "lucide-react";
import AutoSave from "./AutoSave";

interface EditorNavbarProps {
  canUndo: boolean;
  canRedo: boolean;
  actions: any;
  previewing: boolean;
  setPreviewing: (value: boolean) => void;
  handleEditorStateSave: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
  query: any;
}

export function EditorNavbar({
  canUndo,
  canRedo,
  actions,
  previewing,
  setPreviewing,
  handleEditorStateSave,
  editorRef,
  query,
}: EditorNavbarProps) {
  return (
    <nav className="bg-white p-4 flex justify-between items-center border-b">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center space-x-2 border-l pl-4">
          <Button variant="ghost" size="icon">
            <Laptop className="h-5 w-5" />
            <span className="sr-only">Desktop view</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Tablet className="h-5 w-5" />
            <span className="sr-only">Tablet view</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Smartphone className="h-5 w-5" />
            <span className="sr-only">Mobile view</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2 border-l pl-4">
          <Button
            onClick={() => canUndo && actions.history.undo()}
            variant="ghost"
            size="icon"
          >
            <Undo className="h-5 w-5" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            onClick={() => canRedo && actions.history.redo()}
            variant="ghost"
            size="icon"
          >
            <Redo className="h-5 w-5" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2 border-l pl-4">
          <AutoSave editorRef={editorRef} query={query} />
        </div>
        <div className="flex items-center space-x-2 border-l pl-4">
          <Button onClick={handleEditorStateSave}>
            <Save />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setPreviewing(!previewing)}
          variant="outline"
          size="sm"
        >
          {!previewing ? (
            <Eye className="mr-2 h-4 w-4" />
          ) : (
            <EyeClosed className="mr-2 h-4 w-4" />
          )}{" "}
          Preview
        </Button>
        <Button onClick={handleEditorStateSave} size="sm">
          Publish
        </Button>
      </div>
    </nav>
  );
}
