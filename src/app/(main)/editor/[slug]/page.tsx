"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  ChevronLeft,
  Laptop,
  Smartphone,
  Tablet,
  ChevronRight,
  Undo,
  Redo,
  RotateCcw,
  Save,
  EyeClosed,
} from "lucide-react";
import { Element, Frame, useEditor } from "@craftjs/core";
import Link from "next/link";
import EditorComponentSettings from "./_components/EditorComponentSettings";
import { useContext, useRef, useState } from "react";
import Container from "./_editor_component/Container";
import EnhancedToolBox from "./_components/EnhancedToolbox";
import AutoSave from "./_components/AutoSave";
import { editingContext } from "@/lib/context/EditorContext";
import { usePathname } from "next/navigation";

export default function Editor({ param }: any) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  const { previewing, setState: setPreviewing } = useContext(editingContext);
  console.log("Current Previewing Sate", previewing);
  const { canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    query,
  }));
  const editorRef =  useRef<HTMLDivElement>(null)
  const pathname = usePathname();
  const handleEditorStateSave = async () => {
    console.log("current path", pathname.split("/")[2]);
    // console.log("Editor State", query.serialize());
    // Save the current editor state to the database
    if(!editorRef.current?.firstChild?.firstChild){
      alert("Some Error Occured While Saving")
      return
    }
    // @ts-ignore
    const html = editorRef?.current.firstChild.firstChild.outerHTML
    const res =  await fetch(`/api/editor?site=${pathname.split("/")[2]}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        savedJsonState: query.serialize(),
        publishedJsonState: html
      }),
    })
    const {data} = await res.json()
    console.log(data)
    if(data.success){
      console.log("Editor state saved successfully")
      alert("Site Saved")
    }else{
      console.log("Failed to save editor state")
      alert("Failed to save site")
    }
  };
  return (
    <div className="flex-1 flex flex-col h-screen">
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
            <AutoSave />
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
          <Button onClick={handleEditorStateSave} size="sm">Publish</Button>
        </div>
      </nav>
      <div className="flex flex-1">
        {/* ToolBox  */}
        <div
          className={`relative bg-white border-l transition-all duration-300 ${
            isLeftSidebarOpen ? "w-64" : "w-12"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={toggleLeftSidebar}
          >
            {isLeftSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isLeftSidebarOpen && <EnhancedToolBox />}
        </div>

        {/* Editor Canvas */}
        <main className="flex-1 p-8 bg-gray-50">
          <Card ref={editorRef} className="w-full aspect-video">
            {/* <CardContent className="flex items-center justify-center h-full text-muted-foreground z-50">
                Drag and drop elements here
              </CardContent> */}
            <Frame>
              <Element
                is={Container}
                width="100%"
                height="100%"
                canvas
              ></Element>
            </Frame>
          </Card>
        </main>

        {/* Setting Panel */}
        <div
          className={`relative bg-white border-l transition-all duration-300 ${
            isRightSidebarOpen ? "w-64" : "w-12"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={toggleRightSidebar}
          >
            {isRightSidebarOpen ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          {isRightSidebarOpen && <EditorComponentSettings />}
        </div>
      </div>
    </div>
  );
}
