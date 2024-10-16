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
} from "lucide-react";
import { Editor as EditorContext, Element, Frame } from "@craftjs/core";
import Link from "next/link";
import ToolBox from "./_components/ToolBox";
import EditorComponentSettings from "./_components/EditorComponentSettings";
import { useState } from "react";
import { Text } from "./_editor_component/Text";
import { Button as EditorBtn } from "./_editor_component/Button";
import Container from "./_editor_component/Container";

export default function Editor() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);
  return (
    <EditorContext
      resolver={{
        Text,
        EditorBtn,
        Container,
      }}
    >
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
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button size="sm">Publish</Button>
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
            {isLeftSidebarOpen && <ToolBox />}
          </div>

          {/* Editor Canvas */}
          <main className="flex-1 p-8 bg-gray-50">
            <Card className="w-full aspect-video">
              {/* <CardContent className="flex items-center justify-center h-full text-muted-foreground z-50">
                Drag and drop elements here
              </CardContent> */}
              <Frame>
                <Element
                  is={Container}

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
    </EditorContext>
  );
}
