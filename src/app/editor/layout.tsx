'use client'
import { Editor } from "@craftjs/core";
import { Button as EditorBtn } from "./_editor_component/Button";
import { Text } from "./_editor_component/Text";

import Container from "./_editor_component/Container";
import ContainerSection from "./_components/ContainerSection";
import ResizableComponent from "./_components/CaludeResize";
import ResizerCustom from "./_components/ResizerCustom";
export default function layout({children}:{
  children:any
}) {
    return (
        <Editor
        
        resolver={{
            Text,
            EditorBtn,
            Container,
            // ContainerSection
            // ResizableComponent
            ResizerCustom,
          }}

        >
           {children}
        </Editor>
    );
}
