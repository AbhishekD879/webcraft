"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Element, useEditor } from "@craftjs/core";
import { ArrowRight, Image, Layout, Type } from "lucide-react";
import { Text } from "../../_editor_component/Text";
import Container from "../../_editor_component/Container";
import ContainerSection from "./ContainerSection";
import { Button as EditorBtn } from "../../_editor_component/Button";
import ResizerCustom from "./ResizerCustom";
export default function ToolBox() {
  const { connectors, query } = useEditor();
  return (
    <aside className="w-64 bg-white border-r p-4">
      <Tabs defaultValue="elements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="elements" className="mt-4">
          <div className="grid text-black grid-cols-2 gap-2">
            <Button
              ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                  connectors.create(ref, <Text />);
                }
              }}
              variant="outline"
              className="flex flex-col items-center py-4"
            >
              <Type className="h-6 w-6 mb-2" />
              Text
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center py-4"
            >
              <Image className="h-6 w-6 mb-2" />
              Image
            </Button>
            <Button
              ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                  connectors.create(
                    ref,
                    <Element
                      is={ResizerCustom}
                      width="100%"
                      height="2rem"
                      canvas
                    ></Element>
                  );
                }
              }}
              variant="outline"
              className="flex flex-col items-center py-4"
            >
              <Layout className="h-6 w-6 mb-2" />
              Section
            </Button>
            <Button
                 ref={(ref: HTMLButtonElement | null) => {
                    if (ref) {
                      connectors.create(
                        ref,
                        <EditorBtn/>
                      );
                    }
                  }}
              variant="outline"
              className="flex flex-col items-center py-4"
            >
              <ArrowRight className="h-6 w-6 mb-2" />
              Button
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="pages">
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Home</span>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>About</span>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>Contact</span>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
