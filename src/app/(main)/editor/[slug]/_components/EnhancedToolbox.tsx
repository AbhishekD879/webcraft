"use client";
import React from "react";
import { Element, useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Type,
  Image,
  Layout,
  ToggleLeft as ButtonIcon,
  Video,
  FileText,
  Table,
  FormInput,
  Map,
  Code,
  Search,
  NotepadText,
} from "lucide-react";
import ResizerCustom from "./ResizerCustom";
import { Button as EditorBtn } from "../_editor_component/Button";
import { VideoComponent } from "../_editor_component/EditorVideo";
import { ImageComponent } from "../_editor_component/EditorImage";
import { ParagraphComponent } from "../_editor_component/EditorParagraph";
import { Grid } from "../_editor_component/EditorGrid";
import { FlexContainer } from "../_editor_component/EditorFlex";
import { InlineTextComponent } from "../_editor_component/EditorText";

// Element and category definitions
const elements = [
  { name: "Text", icon: Type, component: InlineTextComponent, isCanvas: false },
  { name: "Image", icon: Image, component: ImageComponent, isCanvas: true },
  { name: "Section", icon: Layout, component: ResizerCustom, isCanvas: true },
  { name: "Button", icon: ButtonIcon, component: EditorBtn, isCanvas: false },
  { name: "Video", icon: Video, component: VideoComponent, isCanvas: false },
  { name: "Document", icon: FileText, component: "iframe", isCanvas: false },
  { name: "Table", icon: Table, component: "table", isCanvas: false },
  { name: "Form", icon: FormInput, component: "form", isCanvas: false },
  { name: "Map", icon: Map, component: "div", isCanvas: false },
  { name: "Code", icon: Code, component: "pre", isCanvas: false },
  {
    name: "Paragraph",
    icon: NotepadText,
    component: ParagraphComponent,
    isCanvas: false,
  },
  {
    name: "Grid",
    icon: Layout,
    component: Grid,
    isCanvas: true,
  },
  {
    name: "Flex",
    icon: Layout,
    component: FlexContainer,
    isCanvas: true,
  },
];

const categories = [
  { name: "Basic", elements: ["Text", "Image", "Section", "Button", "Paragraph","Grid","Flex"] },
  { name: "Media", elements: ["Video", "Document"] },
  { name: "Data", elements: ["Table", "Form"] },
  { name: "Advanced", elements: ["Map", "Code"] },
];

export default function EnhancedToolBox() {
  const { connectors } = useEditor();

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col p-3">
      <div className="p-4 border-b">
        <Label htmlFor="search-elements" className="sr-only">
          Search elements
        </Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-elements"
            placeholder="Search elements"
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="elements" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="elements">
            <Accordion type="multiple">
              {categories.map((category) => (
                <AccordionItem value={category.name} key={category.name}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {category.elements.map((elementName) => {
                        const element = elements.find(
                          (e) => e.name === elementName
                        );
                        if (!element) return null;
                        return (
                          <Button
                            key={element.name}
                            //@ts-ignore
                            ref={(ref: HTMLButtonElement | null) => {
                              if (ref) {
                                connectors.create(
                                  ref,
                                  element.isCanvas ? (
                                    <Element
                                      is={element.component}
                                      canvas
                                    ></Element>
                                  ) : (
                                    <element.component />
                                  )
                                );
                              }
                            }}
                            variant="outline"
                            className="flex flex-col items-center py-4 h-24"
                          >
                            <element.icon className="h-8 w-8 mb-2" />
                            <span className="text-xs">{element.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="pages" className="p-4">
            {["Home", "About", "Contact", "Products", "Blog"].map((page) => (
              <div key={page} className="flex items-center justify-between">
                <span>{page}</span>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </aside>
  );
}
