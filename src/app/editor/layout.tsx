'use client'
import { Editor } from "@craftjs/core";
import { Button as EditorBtn } from "./_editor_component/Button";
import { Text } from "./_editor_component/Text";

import Container from "./_editor_component/Container";
import ContainerSection from "./_components/ContainerSection";
import ResizableComponent from "./_components/CaludeResize";
import ResizerCustom from "./_components/ResizerCustom";
import { VideoComponent } from "./_editor_component/EditorVideo";
import { ImageComponent, ImageInner } from "./_editor_component/EditorImage";
import { ParagraphComponent } from "./_editor_component/EditorParagraph";
import ResizeWrapper from "./_editor_component/ResizeWrapper";
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
            VideoComponent,
            ImageComponent,
            ParagraphComponent,
            ResizeWrapper,
            ResizerCustom,
            ImageInner
            // Inner
          }}

        >
           {children}
        </Editor>
    );
}
