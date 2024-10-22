"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Element, Frame, useEditor } from "@craftjs/core";
import Link from "next/link";


import { Card } from "@/components/ui/card";

import EditorComponentSettings from "./_components/EditorComponentSettings";
import Container from "./_editor_component/Container";
import EnhancedToolBox from "./_components/EnhancedToolbox";
import { editingContext } from "@/lib/context/EditorContext";

import { fetchEditorState, saveEditorState } from "@/lib/api/editorApi";
import { EditorNavbar } from "./_components/EditorNavbar";
import { Sidebar } from "./_components/Sidebar";

export default function Editor() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [jsonState, setJsonState] = useState("");
  const { previewing, setState: setPreviewing } = useContext(editingContext);
  const editorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    query,
  }));

  useEffect(() => {
    const loadEditorState = async () => {
      const data = await fetchEditorState(pathname.split("/")[2]);
      setJsonState(JSON.stringify(data[0].savedJsonState));
    };
    loadEditorState();
  }, [pathname]);

  const handleEditorStateSave = async () => {
    if (!editorRef.current?.firstChild?.firstChild) {
      alert("Some Error Occurred While Saving");
      return;
    }
    // @ts-ignore
    const html = editorRef.current.firstChild.firstChild.outerHTML;
    const success = await saveEditorState(pathname.split("/")[2], query.serialize(), html);
    if (success) {
      alert("Site Saved");
    } else {
      alert("Failed to save site");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <EditorNavbar
        canUndo={canUndo}
        canRedo={canRedo}
        actions={actions}
        previewing={previewing}
        setPreviewing={setPreviewing}
        handleEditorStateSave={handleEditorStateSave}
      />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isLeftSidebarOpen}
          setIsOpen={setIsLeftSidebarOpen}
          side="left"
        >
          <EnhancedToolBox />
        </Sidebar>

        <main className="flex-1 p-8 bg-gray-50">
          <Card ref={editorRef} className="w-full aspect-video">
            <Frame data={jsonState}>
              {/* <Element
                is={Container}
                width="100%"
                height="100%"
                canvas
              ></Element> */}
            </Frame>
          </Card>
        </main>

        <Sidebar
          isOpen={isRightSidebarOpen}
          setIsOpen={setIsRightSidebarOpen}
          side="right"
        >
          <EditorComponentSettings />
        </Sidebar>
      </div>
    </div>
  );
}
